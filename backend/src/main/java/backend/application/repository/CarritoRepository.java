package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Carrito;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {

}
