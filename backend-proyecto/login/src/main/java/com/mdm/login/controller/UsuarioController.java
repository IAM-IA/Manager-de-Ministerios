package com.mdm.login.controller;

import com.mdm.login.model.Usuario;
import com.mdm.login.service.UsuarioServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST encargado de exponer los endpoints HTTP para la gestión de la entidad Usuario.
 * Administra el ciclo de vida de las cuentas, proporcionando operaciones CRUD básicas y el mecanismo
 * de autenticación del sistema.
 * 
 * @author Ismae
 * @version 1.0
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioServices;

    /**
     * Registra y persiste un nuevo usuario en la base de datos del sistema.
     * 
     * @param usuario Objeto de tipo {@link Usuario} que contiene la información estructurada de registro.
     * @return El objeto {@link Usuario} guardado con sus propiedades e identificador asignado.
     */
    @PostMapping("/nuevo")
    public Usuario newUsuario(@RequestBody Usuario usuario) {
        return usuarioServices.guardar(usuario);
    }

    /**
     * Recupera el listado completo de todos los usuarios registrados.
     * 
     * @return Una lista de tipo {@link List} que contiene todas las instancias de {@link Usuario}.
     */
    @GetMapping("/mostrar")
    public List<Usuario> getAll() {
        return usuarioServices.listarTodos();
    }

    /**
     * Modifica las propiedades e información de un perfil de usuario existente.
     * 
     * @param usuario Objeto de tipo {@link Usuario} con los datos actualizados a persistir.
     * @return El objeto {@link Usuario} modificado con los cambios almacenados en el repositorio.
     */
    @PostMapping("/modificar")
    public Usuario updateUsuario(@RequestBody Usuario usuario) {
        return usuarioServices.modifyUsuario(usuario);
    }

    /**
     * Elimina de forma permanente una cuenta de usuario del sistema mediante su identificador.
     * 
     * @param id Identificador numérico de tipo {@link Long} perteneciente al usuario que será removido.
     */
    @DeleteMapping("/eliminar/{id}")
    public void deleteUsuario(@PathVariable("id") Long id) {
        usuarioServices.eliminar(id);
    }
    
    /**
     * Evalúa las credenciales proporcionadas para autorizar o denegar el inicio de sesión.
     * Efectúa una búsqueda lineal insensible a mayúsculas sobre los registros para validar el acceso.
     * 
     * @param usuario Objeto {@link Usuario} que transporta el correo y contraseña a validar.
     * @return Un objeto {@link org.springframework.http.ResponseEntity} con estado HTTP 200 (OK) y los datos
     *         del usuario autenticado, o un estado HTTP 401 (UNAUTHORIZED) con un mensaje descriptivo en caso de error.
     */
    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        java.util.Optional<Usuario> usuarioEncontrado = usuarioServices.listarTodos().stream()
                .filter(u -> u.getCorreo().equalsIgnoreCase(usuario.getCorreo()))
                .findFirst();

        if (usuarioEncontrado.isPresent() && 
            usuarioEncontrado.get().getContrasena().equals(usuario.getContrasena())) {
            
            return org.springframework.http.ResponseEntity.ok(usuarioEncontrado.get());
        }
        
        return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED)
                .body("Credenciales incorrectas");
    }
}