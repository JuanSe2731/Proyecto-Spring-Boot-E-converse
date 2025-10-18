package backend.application.service;

import java.util.List;
import backend.application.model.Pedido;

public interface IPedidoService {
	List<Pedido> getPedidos();
	Pedido nuevoPedido(Pedido pedido);
	Pedido buscarPedido(Long id);
	int borrarPedido(Long id);
}
