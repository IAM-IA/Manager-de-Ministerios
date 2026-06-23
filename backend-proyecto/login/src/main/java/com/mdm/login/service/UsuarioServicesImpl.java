package com.mdm.login.service;

import com.mdm.login.model.Usuario;
import com.mdm.login.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Implementacion concreta de la interfaz UsuarioServices.
 * Contiene la logica de negocio y se comunica directamente con el repositorio.
 * 
 * @author Ismael
 * @version 1.0
 */
@Service
public class UsuarioServicesImpl implements UsuarioServices {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario modifyUsuario(Usuario usuario) {
        // Busca el usuario por su ID antes de modificarlo en MySQL
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findById(usuario.getId());
        
        // Si existe, actualiza de forma manual cada propiedad
        if (usuarioEncontrado.isPresent()) {
            Usuario usuarioActual = usuarioEncontrado.get();
            usuarioActual.setNombre(usuario.getNombre());
            usuarioActual.setCorreo(usuario.getCorreo());
            usuarioActual.setContrasena(usuario.getContrasena());
            usuarioActual.setRol(usuario.getRol());
            
            // Guarda los cambios y retorna la entidad actualizada
            return usuarioRepository.save(usuarioActual);
        }
        
        // Si el ID no coincide con ningun registro, retorna null
        return null;
    }

    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}