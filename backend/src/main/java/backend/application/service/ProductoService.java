package backend.application.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.application.model.Producto;
import backend.application.repository.ProductoRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductoService implements IProductoService {
	
	@Autowired
    ProductoRepository productoRepository;

    @Override
    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }

    @Override
    public Producto nuevoProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto buscarProducto(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @Override
    public int borrarProducto(Long id) {
        productoRepository.deleteById(id);
        return 1;
    }
	
}
