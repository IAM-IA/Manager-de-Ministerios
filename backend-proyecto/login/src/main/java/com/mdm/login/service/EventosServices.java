package com.mdm.login.service;

import com.mdm.login.model.Eventos;
import java.util.List;

/**
 * Interfaz que define los servicios CRUD para la gestion de eventos.
 * Sigue el patron de arquitectura en capas de Spring Boot.
 * 
 * @author Ismael
 * @version 1.0
 */
public interface EventosServices {

    /**
     * Obtiene la lista completa de eventos registrados.
     * @return Lista de entidades Eventos.
     */
    public List<Eventos> listarTodos();

    /**
     * Registra un nuevo evento en el sistema.
     * @param eventos Objeto con los datos a procesar.
     * @return El objeto Eventos guardado con su respectivo ID.
     */
    public Eventos guardar(Eventos eventos);

    /**
     * Modifica un evento existente validando previamente su presencia en la BD.
     * @param eventos Objeto con los nuevos datos.
     * @return El evento actualizado o null si no se encontro.
     */
    public Eventos modifyEventos(Eventos eventos);

    /**
     * Busca un evento en el sistema a partir de su ID unico.
     * @param id Identificador de tipo Long.
     * @return La entidad Eventos si es encontrada, o null en caso contrario.
     */
    public Eventos buscarPorId(Long id);

    /**
     * Elimina un registro de la base de datos de manera definitiva.
     * @param id Identificador unico del evento a remover.
     */
    public void eliminar(Long id);
}