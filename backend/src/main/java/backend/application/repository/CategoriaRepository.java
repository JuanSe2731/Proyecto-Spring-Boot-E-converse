package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}
