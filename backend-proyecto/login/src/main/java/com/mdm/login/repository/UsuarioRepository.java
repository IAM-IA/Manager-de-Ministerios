package com.mdm.login.repository;

// Importa la entidad Usuario para trabajar con ella en la BD
import com.mdm.login.model.Usuario;

// Importa JpaRepository de Spring Data JPA
// para acceder a metodos CRUD automaticos
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Define una interfaz llamada UsuarioRepository
 * que hereda de JpaRepository
 * 
 * @author ismae
 * @version 1.0
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}