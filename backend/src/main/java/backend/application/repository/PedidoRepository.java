package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{

}
