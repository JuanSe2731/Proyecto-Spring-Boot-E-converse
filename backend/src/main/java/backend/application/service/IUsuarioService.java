package backend.application.service;

import java.util.List;

import backend.application.model.Usuario;

public interface IUsuarioService {
	
	List<Usuario> getUsuarios();
	
	Usuario nuevoUsuario(Usuario usuario);
	
	Usuario buscarUsuario(Long id);
	
	int borrarUsuario(Long id);

}
