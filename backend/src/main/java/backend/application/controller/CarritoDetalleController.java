package backend.application.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.application.model.Carrito;
import backend.application.model.CarritoDetalle;
import backend.application.model.Producto;
import backend.application.model.Usuario;
import backend.application.repository.CarritoDetalleRepository;
import backend.application.repository.CarritoRepository;
import backend.application.repository.ProductoRepository;
import backend.application.repository.UsuarioRepository;
import backend.application.seguridad.JwtTokenUtil;

@RestController
@RequestMapping("/carrito")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500"}, allowCredentials = "true")
public class CarritoDetalleController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CarritoDetalleRepository carritoDetalleRepository;

    public static class AddToCartRequest {
        public Long productoId;
        public Integer cantidad;

        public Long getProductoId() { return productoId; }
        public Integer getCantidad() { return cantidad; }
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarAlCarrito(@RequestHeader("Authorization") String authHeader, @RequestBody AddToCartRequest req) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Token ausente"));
            }

            String token = authHeader.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username == null) return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));

            // Buscar usuario por correo/username
            Usuario usuario = usuarioRepository.findByCorreo(username).orElse(null);
            if (usuario == null) return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));

            // Buscar o crear carrito del usuario
            Carrito carrito = carritoRepository.findByUsuario(usuario).orElse(null);
            if (carrito == null) {
                carrito = new Carrito();
                carrito.setUsuario(usuario);
                carrito.setFechaCreacion(LocalDateTime.now());
                carrito = carritoRepository.save(carrito);
            }

            // Buscar producto
            Producto producto = productoRepository.findById(req.getProductoId()).orElse(null);
            if (producto == null) return ResponseEntity.status(404).body(Map.of("message", "Producto no encontrado"));

            // Crear detalle
            CarritoDetalle detalle = new CarritoDetalle();
            detalle.setCarrito(carrito);
            detalle.setProducto(producto);
            detalle.setCantidad(req.getCantidad() != null ? req.getCantidad() : 1);
            BigDecimal subtotal = producto.getPrecio().multiply(new BigDecimal(detalle.getCantidad()));
            detalle.setSubtotal(subtotal);

            carritoDetalleRepository.save(detalle);

            Map<String, Object> resp = new HashMap<>();
            resp.put("message", "Producto agregado");
            resp.put("detalleId", detalle.getIdDetalle());
            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno", "error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> obtenerCarrito(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Token ausente"));
            }

            String token = authHeader.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username == null) return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));

            // Buscar usuario por correo/username
            Usuario usuario = usuarioRepository.findByCorreo(username).orElse(null);
            if (usuario == null) return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));

            // Buscar carrito del usuario
            Carrito carrito = carritoRepository.findByUsuario(usuario).orElse(null);
            if (carrito == null) {
                // Si no tiene carrito, retornar carrito vacío
                Map<String, Object> resp = new HashMap<>();
                resp.put("items", new ArrayList<>());
                resp.put("total", 0);
                return ResponseEntity.ok(resp);
            }

            // Obtener detalles del carrito
            List<CarritoDetalle> detalles = carritoDetalleRepository.findByCarrito(carrito);
            
            // Construir respuesta
            List<Map<String, Object>> items = new ArrayList<>();
            BigDecimal total = BigDecimal.ZERO;

            for (CarritoDetalle detalle : detalles) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", detalle.getIdDetalle());
                item.put("cantidad", detalle.getCantidad());
                item.put("subtotal", detalle.getSubtotal());
                
                // Incluir información del producto
                Map<String, Object> productoInfo = new HashMap<>();
                Producto p = detalle.getProducto();
                productoInfo.put("idProducto", p.getIdProducto());
                productoInfo.put("nombre", p.getNombre());
                productoInfo.put("precio", p.getPrecio());
                productoInfo.put("imagenUrl", p.getImagenUrl());
                
                item.put("producto", productoInfo);
                items.add(item);
                
                total = total.add(detalle.getSubtotal());
            }

            Map<String, Object> resp = new HashMap<>();
            resp.put("items", items);
            resp.put("total", total);
            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno", "error", e.getMessage()));
        }
    }

    @PutMapping("/actualizar/{itemId}")
    public ResponseEntity<?> actualizarCantidad(@RequestHeader("Authorization") String authHeader, 
                                                 @PathVariable Long itemId, 
                                                 @RequestBody Map<String, Integer> body) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Token ausente"));
            }

            String token = authHeader.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username == null) return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));

            // Buscar el detalle del carrito
            CarritoDetalle detalle = carritoDetalleRepository.findById(itemId).orElse(null);
            if (detalle == null) {
                return ResponseEntity.status(404).body(Map.of("message", "Item no encontrado"));
            }

            // Verificar que el carrito pertenece al usuario
            Usuario usuario = usuarioRepository.findByCorreo(username).orElse(null);
            if (usuario == null || !detalle.getCarrito().getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
                return ResponseEntity.status(403).body(Map.of("message", "No autorizado"));
            }

            // Actualizar cantidad
            Integer nuevaCantidad = body.get("cantidad");
            if (nuevaCantidad == null || nuevaCantidad < 1) {
                return ResponseEntity.badRequest().body(Map.of("message", "Cantidad inválida"));
            }

            detalle.setCantidad(nuevaCantidad);
            BigDecimal nuevoSubtotal = detalle.getProducto().getPrecio().multiply(new BigDecimal(nuevaCantidad));
            detalle.setSubtotal(nuevoSubtotal);
            carritoDetalleRepository.save(detalle);

            return ResponseEntity.ok(Map.of("message", "Cantidad actualizada", "cantidad", nuevaCantidad));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno", "error", e.getMessage()));
        }
    }

    @DeleteMapping("/eliminar/{itemId}")
    public ResponseEntity<?> eliminarItem(@RequestHeader("Authorization") String authHeader, 
                                          @PathVariable Long itemId) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Token ausente"));
            }

            String token = authHeader.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username == null) return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));

            // Buscar el detalle del carrito
            CarritoDetalle detalle = carritoDetalleRepository.findById(itemId).orElse(null);
            if (detalle == null) {
                return ResponseEntity.status(404).body(Map.of("message", "Item no encontrado"));
            }

            // Verificar que el carrito pertenece al usuario
            Usuario usuario = usuarioRepository.findByCorreo(username).orElse(null);
            if (usuario == null || !detalle.getCarrito().getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
                return ResponseEntity.status(403).body(Map.of("message", "No autorizado"));
            }

            // Eliminar el item
            carritoDetalleRepository.delete(detalle);

            return ResponseEntity.ok(Map.of("message", "Item eliminado"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno", "error", e.getMessage()));
        }
    }

}

