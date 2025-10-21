package backend.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	Optional<Usuario> findByCorreo(String correo);

}
