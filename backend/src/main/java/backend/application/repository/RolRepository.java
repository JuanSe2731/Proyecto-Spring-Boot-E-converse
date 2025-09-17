package backend.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.application.model.Rol;

public interface RolRepository extends JpaRepository<Rol, Long>{

}
