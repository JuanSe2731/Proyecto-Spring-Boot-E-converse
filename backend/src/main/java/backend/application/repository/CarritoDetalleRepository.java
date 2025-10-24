package backend.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Carrito;
import backend.application.model.CarritoDetalle;

public interface CarritoDetalleRepository extends JpaRepository<CarritoDetalle, Long>{
    List<CarritoDetalle> findByCarrito(Carrito carrito);
}

