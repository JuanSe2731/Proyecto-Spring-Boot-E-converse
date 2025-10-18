package backend.application.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.application.model.Categoria;
import backend.application.repository.CategoriaRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoriaService implements ICategoriaService {
	
	@Autowired
    CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> getCategorias() {
        return categoriaRepository.findAll();
    }

    @Override
    public Categoria nuevaCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    @Override
    public int borrarCategoria(Long id) {
        categoriaRepository.deleteById(id);
        return 1;
    }
	
}
