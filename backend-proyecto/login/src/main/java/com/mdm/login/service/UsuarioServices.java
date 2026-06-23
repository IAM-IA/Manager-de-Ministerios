package com.mdm.login.service;

import com.mdm.login.model.Usuario;
import java.util.List;

/**
 * Interfaz que define los servicios CRUD para la gestion de usuarios.
 * Sigue el patron de arquitectura en capas de Spring Boot.
 * 
 * @author Ismael
 * @version 1.0
 */
public interface UsuarioServices {

    /**
     * Obtiene la lista completa de usuarios registrados.
     * @return Lista de entidades Usuario.
     */
    public List<Usuario> listarTodos();

    /**
     * Registra un nuevo usuario en el sistema.
     * @param usuario Objeto con los datos a procesar.
     * @return El objeto Usuario guardado con su respectivo ID.
     */
    public Usuario guardar(Usuario usuario);

    /**
     * Modifica un usuario existente validando previamente su presencia en la BD.
     * @param usuario Objeto con los nuevos datos.
     * @return El usuario actualizado o null si no se encontro.
     */
    public Usuario modifyUsuario(Usuario usuario);

    /**
     * Busca un usuario en el sistema a partir de su ID unico.
     * @param id Identificador de tipo Long.
     * @return La entidad Usuario si es encontrada, o null en caso contrario.
     */
    public Usuario buscarPorId(Long id);

    /**
     * Elimina un registro de la base de datos de manera definitiva.
     * @param id Identificador unico del usuario a remover.
     */
    public void eliminar(Long id);
}