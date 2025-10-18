package backend.application.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.application.model.Producto;
import backend.application.service.ProductoService;

@RestController
@RequestMapping("/producto")
public class ProductoController {
	
	@Autowired
    ProductoService productoService;

    @GetMapping("/list")
    public List<Producto> listarProductos() {
        return productoService.getProductos();
    }

    @GetMapping("/list/{id}")
    public Producto buscarId(@PathVariable Long id) {
        return productoService.buscarProducto(id);
    }

    @PostMapping("/new")
    public ResponseEntity<Producto> agregar(@RequestBody Producto producto) {
        Producto obj = productoService.nuevoProducto(producto);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Producto> editar(@RequestBody Producto producto) {
        Producto obj = productoService.buscarProducto(producto.getIdProducto());
        if (obj != null) {
            obj.setNombre(producto.getNombre());
            obj.setDescripcion(producto.getDescripcion());
            obj.setPrecio(producto.getPrecio());
            obj.setStock(producto.getStock());
            obj.setImagenUrl(producto.getImagenUrl());
            obj.setCategoria(producto.getCategoria());
            productoService.nuevoProducto(obj);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Producto> eliminar(@PathVariable Long id) {
        Producto obj = productoService.buscarProducto(id);
        if (obj != null) {
            productoService.borrarProducto(id);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
}
