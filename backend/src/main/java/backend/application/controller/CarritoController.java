package backend.application.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.application.model.Carrito;
import backend.application.service.CarritoService;

@RestController
@RequestMapping("/carrito")
public class CarritoController {
	
	@Autowired
    CarritoService carritoService;

    @GetMapping("/list")
    public List<Carrito> listarCarritos() {
        return carritoService.getCarritos();
    }

    @GetMapping("/list/{id}")
    public Carrito buscarId(@PathVariable Long id) {
        return carritoService.buscarCarrito(id);
    }

    @PostMapping("/new")
    public ResponseEntity<Carrito> agregar(@RequestBody Carrito carrito) {
        Carrito obj = carritoService.nuevoCarrito(carrito);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Carrito> editar(@RequestBody Carrito carrito) {
        Carrito obj = carritoService.buscarCarrito(carrito.getIdCarrito());
        if (obj != null) {
            obj.setFechaCreacion(carrito.getFechaCreacion());
            obj.setUsuario(carrito.getUsuario());
            carritoService.nuevoCarrito(obj);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Carrito> eliminar(@PathVariable Long id) {
        Carrito obj = carritoService.buscarCarrito(id);
        if (obj != null) {
            carritoService.borrarCarrito(id);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
}
