package backend.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Carrito;
import backend.application.model.Usuario;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
	Optional<Carrito> findByUsuario(Usuario usuario);

}
