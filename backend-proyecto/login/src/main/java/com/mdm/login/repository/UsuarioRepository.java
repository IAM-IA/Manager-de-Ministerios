package com.mdm.login.repository;

import com.mdm.login.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interfaz de repositorio encargada del acceso y la persistencia de datos para la entidad {@link Usuario}.
 * Extiende las capacidades abstractas de {@link JpaRepository} para habilitar los mecanismos automáticos 
 * de transaccionalidad, mapeo relacional de entidades y consultas genéricas sobre la tabla de usuarios.
 * 
 * @author ismae
 * @version 1.0
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}