package com.mdm.login.service;

import com.mdm.login.model.Eventos;
import java.util.List;

/**
 * Interfaz de la capa de negocio que establece el contrato para la gestión operativa de la entidad {@link Eventos}.
 * Define las operaciones abstractas del ciclo de vida CRUD y consultas especializadas que deben ser 
 * implementadas por los servicios del sistema para garantizar el cumplimiento de las reglas de negocio.
 * 
 * @author Ismael
 * @version 1.0
 */
public interface EventosServices {

    /**
     * Recupera la totalidad de los registros de eventos persistidos en la base de datos.
     * 
     * @return Una colección de tipo {@link List} que contiene todas las instancias de {@link Eventos}.
     */
    public List<Eventos> listarTodos();

    /**
     * Procesa y almacena un nuevo registro de evento aplicando las reglas de validación vigentes.
     * 
     * @param eventos Instancia de tipo {@link Eventos} que transporta la información requerida para el alta.
     * @return El objeto {@link Eventos} persistido con las propiedades asignadas por el motor de base de datos.
     */
    public Eventos guardar(Eventos eventos);

    /**
     * Actualiza la información estructural de un registro de evento previamente existente.
     * 
     * @param eventos Instancia de tipo {@link Eventos} que contiene las modificaciones técnicas a guardar.
     * @return El objeto {@link Eventos} con los cambios consolidados en el medio de almacenamiento, 
     *         o {@code null} si la entidad de referencia no es localizada en el repositorio.
     */
    public Eventos modifyEventos(Eventos eventos);

    /**
     * Efectúa una búsqueda selectiva dentro del repositorio de datos utilizando la clave primaria del registro.
     * 
     * @param id Identificador numérico de tipo {@link Long} representativo del evento requerido.
     * @return La instancia de {@link Eventos} asociada al criterio de búsqueda, o {@code null} 
     *         en caso de no existir correspondencia en el almacén de datos.
     */
    public Eventos buscarPorId(Long id);

    /**
     * Remueve de forma definitiva y permanente un registro de evento del almacén relacional de datos.
     * 
     * @param id Identificador numérico de tipo {@link Long} que indexa al registro específico que será borrado.
     */
    public void eliminar(Long id);
}