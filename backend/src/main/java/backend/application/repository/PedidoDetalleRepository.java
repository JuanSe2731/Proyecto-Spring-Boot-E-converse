package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.PedidoDetalle;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

}
