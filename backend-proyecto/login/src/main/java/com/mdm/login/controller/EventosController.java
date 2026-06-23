package com.mdm.login.controller;

import com.mdm.login.model.Eventos;
import com.mdm.login.service.EventosServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST que gestiona las peticiones HTTP para la entidad Eventos.
 * Sigue la estructura exacta de paquetes creada en NetBeans.
 * 
 * @author Ismae
 * @version 1.0
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/eventos")
public class EventosController {

    @Autowired
    private EventosServices eventosServices; // Corregido el nombre en plural del servicio

    /**
     * Endpoint para registrar un nuevo evento mediante una peticion POST.
     * Ruta HTTP: http://localhost:8081/eventos/nuevo
     */
    @PostMapping("/nuevo")
    public Eventos newEvento(@RequestBody Eventos eventos) {
        return eventosServices.guardar(eventos);
    }

    /**
     * Endpoint para obtener la lista de todos los eventos mediante una peticion GET.
     * Ruta HTTP: http://localhost:8081/eventos/mostrar
     */
    @GetMapping("/mostrar")
    public List<Eventos> getAll() {
        return eventosServices.listarTodos();
    }

    /**
     * Endpoint para actualizar un evento existente mediante una peticion POST.
     * Ruta HTTP: http://localhost:8081/eventos/modificar
     */
    @PostMapping("/modificar")
    public Eventos updateEvento(@RequestBody Eventos eventos) {
        return eventosServices.modifyEventos(eventos); // Corregido el nombre del método en plural
    }

    /**
     * Endpoint para eliminar un evento por su ID mediante una peticion DELETE.
     * Ruta HTTP: http://localhost:8081/eventos/eliminar/{id}
     */
    @DeleteMapping("/eliminar/{id}")
    public void deleteEvento(@PathVariable("id") Long id) {
        eventosServices.eliminar(id);
    }
}