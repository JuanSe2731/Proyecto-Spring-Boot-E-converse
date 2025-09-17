package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.CarritoDetalle;

public interface CarritoDetalleRepository extends JpaRepository<CarritoDetalle, Long>{

}
