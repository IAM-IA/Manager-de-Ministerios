package com.mdm.login.service;

import com.mdm.login.model.Eventos;
import com.mdm.login.repository.EventosRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Implementación concreta del componente de negocio definido por la interfaz {@link EventosServices}.
 * Se encarga de coordinar la lógica de negocio operativa de los eventos mediante la delegación 
 * directa de transacciones a la capa de abstracción del repositorio {@link EventosRepository}.
 * 
 * @author Ismael
 * @version 1.0
 */
@Service
public class EventosServicesImpl implements EventosServices {

    @Autowired
    private EventosRepository eventosRepository;

    /**
     * {@inheritDoc}
     * Recupera todos los registros de la entidad invocando el método genérico del repositorio.
     */
    @Override
    public List<Eventos> listarTodos() {
        return eventosRepository.findAll();
    }

    /**
     * {@inheritDoc}
     * Realiza el registro y persistencia de un nuevo evento en el origen de datos.
     */
    @Override
    public Eventos guardar(Eventos eventos) {
        return eventosRepository.save(eventos);
    }

    /**
     * {@inheritDoc}
     * Ejecuta una validación de existencia de la entidad de destino mediante su clave primaria.
     * Si la entidad se encuentra presente, actualiza el estado de sus propiedades modificables 
     * y consolida la transacción.
     */
    @Override
    public Eventos modifyEventos(Eventos eventos) {
        Optional<Eventos> eventoEncontrado = eventosRepository.findById(eventos.getIdEventos());
        
        if (eventoEncontrado.isPresent()) {
            Eventos eventoActual = eventoEncontrado.get();
            eventoActual.setNombre(eventos.getNombre());
            eventoActual.setFecha(eventos.getFecha());
            eventoActual.setIdUsuario(eventos.getIdUsuario());
            eventoActual.setDescripcion(eventos.getDescripcion());
            
            return eventosRepository.save(eventoActual);
        }
        
        return null;
    }

    /**
     * {@inheritDoc}
     * Inspecciona de forma segura la existencia de un registro por su clave primaria, retornando
     * la instancia mapeada o una referencia nula en caso de ausencia.
     */
    @Override
    public Eventos buscarPorId(Long id) {
        return eventosRepository.findById(id).orElse(null);
    }

    /**
     * {@inheritDoc}
     * Remueve la entidad correspondiente del almacén relacional por medio de su identificador.
     */
    @Override
    public void eliminar(Long id) {
        eventosRepository.deleteById(id);
    }
}