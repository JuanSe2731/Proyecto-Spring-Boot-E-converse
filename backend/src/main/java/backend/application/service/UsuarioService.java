package backend.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.application.model.Usuario;
import backend.application.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioService implements IUsuarioService{
	
	@Autowired
	UsuarioRepository usuarioRepository;

	@Override
	public List<Usuario> getUsuarios() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario nuevoUsuario(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	@Override
	public Usuario buscarUsuario(Long id) {
		Usuario usuario = null;
		usuario = usuarioRepository.findById(id).orElse(null);
		if (usuario == null) {
			return null;
		}
		return usuario;
	}

	@Override
	public int borrarUsuario(Long id) {
		usuarioRepository.deleteById(id);
		return 1;
	}
	
	

}
