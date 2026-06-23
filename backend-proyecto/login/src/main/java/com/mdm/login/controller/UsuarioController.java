package com.mdm.login.controller;

import com.mdm.login.model.Usuario;
import com.mdm.login.service.UsuarioServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST que gestiona las peticiones HTTP para la entidad Usuario.
 * Expone los endpoints de la API para las operaciones CRUD.
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
     * Endpoint para registrar un nuevo usuario mediante una peticion POST.
     * Ruta HTTP: /usuario/nuevo
     */
    @PostMapping("/nuevo")
    public Usuario newUsuario(@RequestBody Usuario usuario) {
        return usuarioServices.guardar(usuario);
    }

    /**
     * Endpoint para obtener la lista de todos los usuarios mediante una peticion GET.
     * Ruta HTTP: /usuario/mostrar
     */
    @GetMapping("/mostrar")
    public List<Usuario> getAll() {
        return usuarioServices.listarTodos();
    }

    /**
     * Endpoint para actualizar un usuario existente mediante una peticion POST.
     * Invoca la logica de validacion del servicio.
     * Ruta HTTP: /usuario/modificar
     */
    @PostMapping("/modificar")
    public Usuario updateUsuario(@RequestBody Usuario usuario) {
        return usuarioServices.modifyUsuario(usuario);
    }

    /**
     * Endpoint para eliminar un usuario por su ID mediante una peticion DELETE.
     * Ruta HTTP: /usuario/eliminar/{id}
     */
    @DeleteMapping("/eliminar/{id}")
    public void deleteUsuario(@PathVariable("id") Long id) {
        usuarioServices.eliminar(id);
    }
    
    /**
     * Endpoint para validar las credenciales de inicio de sesion.
     * Ruta HTTP: /usuario/login
     */
    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        // Busca al usuario por el correo electronico registrado
        java.util.Optional<Usuario> usuarioEncontrado = usuarioServices.listarTodos().stream()
                .filter(u -> u.getCorreo().equalsIgnoreCase(usuario.getCorreo()))
                .findFirst();

        // Valida la existencia del usuario y la coincidencia de su contrasena
        if (usuarioEncontrado.isPresent() && 
            usuarioEncontrado.get().getContrasena().equals(usuario.getContrasena())) {
            
            // Retorna una respuesta exitosa con los datos del usuario en sesion
            return org.springframework.http.ResponseEntity.ok(usuarioEncontrado.get());
        }
        
        // Retorna un estado HTTP 401 si las credenciales son incorrectas
        return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED)
                .body("Credenciales incorrectas");
    }
}