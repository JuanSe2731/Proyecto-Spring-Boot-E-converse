package backend.application.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.application.model.Pedido;
import backend.application.repository.PedidoRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class PedidoService implements IPedidoService {
	
	@Autowired
	PedidoRepository pedidoRepository;
	
	@Override
	public List<Pedido> getPedidos() {
		return pedidoRepository.findAll();
	}
	
	@Override
	public Pedido nuevoPedido(Pedido pedido) {
		return pedidoRepository.save(pedido);
	}
	
	@Override
	public Pedido buscarPedido(Long id) {
		return pedidoRepository.findById(id).orElse(null);
	}
	
	@Override
	public int borrarPedido(Long id) {
		pedidoRepository.deleteById(id);
		return 1;
	}
	
}
