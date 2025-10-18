package backend.application.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.application.model.Categoria;
import backend.application.service.CategoriaService;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
	
	@Autowired
    CategoriaService categoriaService;

    @GetMapping("/list")
    public List<Categoria> listarCategorias() {
        return categoriaService.getCategorias();
    }

    @GetMapping("/list/{id}")
    public Categoria buscarId(@PathVariable Long id) {
        return categoriaService.buscarCategoria(id);
    }

    @PostMapping("/new")
    public ResponseEntity<Categoria> agregar(@RequestBody Categoria categoria) {
        Categoria obj = categoriaService.nuevaCategoria(categoria);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Categoria> editar(@RequestBody Categoria categoria) {
        Categoria obj = categoriaService.buscarCategoria(categoria.getIdCategoria());
        if (obj != null) {
            obj.setNombre(categoria.getNombre());
            categoriaService.nuevaCategoria(obj);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Categoria> eliminar(@PathVariable Long id) {
        Categoria obj = categoriaService.buscarCategoria(id);
        if (obj != null) {
            categoriaService.borrarCategoria(id);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
}
