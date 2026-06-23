package com.mdm.login.service;

import com.mdm.login.model.Eventos;
import com.mdm.login.repository.EventosRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Implementacion concreta de la interfaz EventosServices.
 * Contiene la logica de negocio y se comunica directamente con el repositorio.
 * 
 * @author Ismael
 * @version 1.0
 */
@Service
public class EventosServicesImpl implements EventosServices {

    @Autowired
    private EventosRepository eventosRepository;

    @Override
    public List<Eventos> listarTodos() {
        return eventosRepository.findAll();
    }

    @Override
    public Eventos guardar(Eventos eventos) {
        return eventosRepository.save(eventos);
    }

    @Override
    public Eventos modifyEventos(Eventos eventos) {
        // Busca el evento por su ID antes de modificarlo en MySQL usando la llave primaria correcta
        Optional<Eventos> eventoEncontrado = eventosRepository.findById(eventos.getIdEventos());
        
        // Si existe, actualiza de forma manual cada propiedad de la tabla eventos
        if (eventoEncontrado.isPresent()) {
            Eventos eventoActual = eventoEncontrado.get();
            eventoActual.setNombre(eventos.getNombre());
            eventoActual.setFecha(eventos.getFecha());
            eventoActual.setIdUsuario(eventos.getIdUsuario());
            eventoActual.setDescripcion(eventos.getDescripcion());
            
            // Guarda los cambios y retorna la entidad actualizada
            return eventosRepository.save(eventoActual);
        }
        
        // Si el ID no coincide con ningun registro, retorna null
        return null;
    }

    @Override
    public Eventos buscarPorId(Long id) {
        return eventosRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        eventosRepository.deleteById(id);
    }
}