package com.mdm.login.controller;

import com.mdm.login.model.Eventos;
import com.mdm.login.service.EventosServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST encargado de exponer los endpoints HTTP para la gestión de la entidad Eventos.
 * Provee las operaciones del ciclo de vida CRUD (Crear, Leer, Actualizar, Eliminar) interactuando
 * con la capa de servicios empresarial.
 * 
 * @author Ismae
 * @version 1.0
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/eventos")
public class EventosController {

    @Autowired
    private EventosServices eventosServices;

    /**
     * Registra y persiste un nuevo evento en el sistema.
     * 
     * @param eventos Objeto de tipo {@link Eventos} que contiene la información estructurada del formulario.
     * @return El objeto {@link Eventos} persistido incluyendo su identificador asignado.
     */
    @PostMapping("/nuevo")
    public Eventos newEvento(@RequestBody Eventos eventos) {
        return eventosServices.guardar(eventos);
    }

    /**
     * Recupera el listado completo de todos los eventos almacenados en el repositorio de datos.
     * 
     * @return Una lista de tipo {@link List} que contiene todas las instancias de {@link Eventos}.
     */
    @GetMapping("/mostrar")
    public List<Eventos> getAll() {
        return eventosServices.listarTodos();
    }

    /**
     * Modifica los atributos de un evento existente mediante los datos actualizados del payload.
     * 
     * @param eventos Objeto de tipo {@link Eventos} con los cambios que se desean persistir.
     * @return El objeto {@link Eventos} con las modificaciones aplicadas en el almacenamiento.
     */
    @PostMapping("/modificar")
    public Eventos updateEvento(@RequestBody Eventos eventos) {
        return eventosServices.modifyEventos(eventos);
    }

    /**
     * Remueve de manera permanente un registro de evento utilizando su identificador único.
     * 
     * @param id Identificador numérico de tipo {@link Long} que mapea al evento que será removido.
     */
    @DeleteMapping("/eliminar/{id}")
    public void deleteEvento(@PathVariable("id") Long id) {
        eventosServices.eliminar(id);
    }
}