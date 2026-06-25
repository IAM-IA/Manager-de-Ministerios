package com.mdm.login.service;

import com.mdm.login.model.Usuario;
import com.mdm.login.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Implementación concreta del componente de negocio definido por la interfaz {@link UsuarioServices}.
 * Se encarga de coordinar la lógica de negocio operativa de las cuentas de usuario mediante la delegación 
 * directa de transacciones a la capa de abstracción del repositorio {@link UsuarioRepository}.
 * 
 * @author Ismael
 * @version 1.0
 */
@Service
public class UsuarioServicesImpl implements UsuarioServices {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * {@inheritDoc}
     * Recupera la lista de todas las cuentas de usuario registradas llamando al método genérico del repositorio.
     */
    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    /**
     * {@inheritDoc}
     * Realiza el alta y la persistencia de una nueva cuenta de usuario en el origen de datos.
     */
    @Override
    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    /**
     * {@inheritDoc}
     * Ejecuta una validación de existencia de la cuenta de destino mediante su clave primaria.
     * Si la entidad se encuentra presente, actualiza el estado de sus propiedades modificables 
     * y consolida la transacción.
     */
    @Override
    public Usuario modifyUsuario(Usuario usuario) {
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findById(usuario.getId());
        
        if (usuarioEncontrado.isPresent()) {
            Usuario usuarioActual = usuarioEncontrado.get();
            usuarioActual.setNombre(usuario.getNombre());
            usuarioActual.setCorreo(usuario.getCorreo());
            usuarioActual.setContrasena(usuario.getContrasena());
            usuarioActual.setRol(usuario.getRol());
            
            return usuarioRepository.save(usuarioActual);
        }
        
        return null;
    }

    /**
     * {@inheritDoc}
     * Inspecciona de forma segura la existencia de una cuenta por su clave primaria, retornando
     * la instancia mapeada o una referencia nula en caso de ausencia.
     */
    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    /**
     * {@inheritDoc}
     * Remueve la entidad correspondiente del almacén relacional por medio de su identificador.
     */
    @Override
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}