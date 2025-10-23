package backend.application.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
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

}
