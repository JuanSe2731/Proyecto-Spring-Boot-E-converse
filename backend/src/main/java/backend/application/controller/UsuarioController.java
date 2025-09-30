package backend.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.application.model.Usuario;
import backend.application.service.UsuarioService;

@RestController
public class UsuarioController {
	
	@Autowired
	UsuarioService usuarioservice;
	
	@GetMapping("/list")
	public List<Usuario> cargarUsuarios(){
		return usuarioservice.getUsuarios();
	}
	
	@GetMapping("/list/{id}")
	public Usuario buscarId(@PathVariable Long id){
		return usuarioservice.buscarUsuario(id);
	}
	
	@PostMapping("/new")
	public ResponseEntity<Usuario> agregar(@RequestBody Usuario usuario){
		Usuario obj = usuarioservice.nuevoUsuario(usuario);
		return new ResponseEntity<>(obj,HttpStatus.OK);
	}
	
	
	@PutMapping("/update")
	public ResponseEntity<Usuario> editar(@RequestBody Usuario usuario){
		Usuario obj = usuarioservice.buscarUsuario(usuario.getIdUsuario());
		
		if (obj != null) {
			obj.setCorreo(usuario.getCorreo());
			obj.setContrasena(usuario.getContrasena());
			obj.setDireccion(usuario.getDireccion());
			obj.setEstado(usuario.getEstado());
			obj.setIdUsuario(usuario.getIdUsuario());
			obj.setNombre(usuario.getNombre());
			obj.setRol(usuario.getRol());
			usuarioservice.nuevoUsuario(obj);
		}else {
			return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(obj,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Usuario> eliminar(@PathVariable Long id){
		Usuario obj = usuarioservice.buscarUsuario(id);
		
		if(obj != null) {
			usuarioservice.borrarUsuario(id);
		}else {
			return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		return new ResponseEntity<>(obj,HttpStatus.OK);
	}

}
