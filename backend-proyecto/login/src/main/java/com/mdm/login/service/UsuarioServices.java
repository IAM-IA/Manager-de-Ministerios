package com.mdm.login.service;

import com.mdm.login.model.Usuario;
import java.util.List;

/**
 * Interfaz de la capa de negocio que establece el contrato formal para la gestión operativa de la entidad {@link Usuario}.
 * Define las operaciones abstractas para la administración de cuentas de usuario, validaciones perimetrales 
 * y consultas de perfiles que deben implementar los servicios del ecosistema.
 * 
 * @version 1.0
 */
public interface UsuarioServices {

    /**
     * Recupera la totalidad de las cuentas de usuario registradas en el origen de datos.
     * 
     * @return Una colección de tipo {@link List} que contiene todas las instancias de {@link Usuario}.
     */
    public List<Usuario> listarTodos();

    /**
     * Procesa y persiste un nuevo registro de usuario en el almacén de datos del sistema.
     * 
     * @param usuario Instancia de tipo {@link Usuario} que transporta los datos requeridos para el registro.
     * @return El objeto {@link Usuario} guardado con el identificador único asignado por la base de datos.
     */
    public Usuario guardar(Usuario usuario);

    /**
     * Actualiza la información y el perfil de una cuenta de usuario previamente existente.
     * 
     * @param usuario Instancia de tipo {@link Usuario} que contiene las modificaciones a aplicar.
     * @return El objeto {@link Usuario} con los cambios consolidados en el almacenamiento, 
     *         o {@code null} si la cuenta de referencia no es localizada en el repositorio.
     */
    public Usuario modifyUsuario(Usuario usuario);

    /**
     * Efectúa una búsqueda selectiva dentro del repositorio de datos utilizando la clave primaria de la cuenta.
     * 
     * @param id Identificador numérico de tipo {@link Long} representativo del usuario requerido.
     * @return La instancia de {@link Usuario} asociada al criterio de búsqueda, o {@code null} 
     *         en caso de no existir correspondencia en el almacén de datos.
     */
    public Usuario buscarPorId(Long id);

    /**
     * Remueve de forma definitiva y permanente una cuenta de usuario del almacén relacional de datos.
     * 
     * @param id Identificador numérico de tipo {@link Long} que indexa al usuario específico que será eliminado.
     */
    public void eliminar(Long id);
}