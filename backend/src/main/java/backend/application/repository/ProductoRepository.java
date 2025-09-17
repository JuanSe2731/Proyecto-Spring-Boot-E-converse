package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{

}
