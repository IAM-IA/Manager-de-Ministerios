package com.mdm.login.repository;

import com.mdm.login.model.Eventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interfaz de repositorio encargada del acceso y la persistencia de datos para la entidad {@link Eventos}.
 * Hereda las capacidades de {@link JpaRepository}, proporcionando de forma nativa e implícita las 
 * operaciones básicas de consulta, paginación, inserción y borrado sobre la base de datos relacional.
 * 
 * @author ismae
 * @version 1.0
 */
@Repository
public interface EventosRepository extends JpaRepository<Eventos, Long> {
}