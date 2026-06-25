package com.mdm.login.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDate;
import lombok.Data;

/**
 * Entidad de persistencia que representa un evento estructurado dentro del sistema.
 * Mapea las propiedades de negocio con el esquema de la tabla de la base de datos relacional.
 * Utiliza anotaciones de Jakarta Persistence para la configuración de ORM y Lombok para
 * la generación dinámica de boilerplate en tiempo de compilación.
 * 
 * @author Ismae
 * @version 1.0
 */
@Entity
@Data
@Table(name = "eventos")
public class Eventos {

    /**
     * Identificador único autoincremental del registro del evento.
     * Mapea como la clave primaria de la tabla correspondiente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_eventos")
    private long idEventos;

    /**
     * Denominación o título representativo asignado al evento.
     */
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    /**
     * Fecha de calendario programada para la ejecución del evento.
     */
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    /**
     * Identificador numérico que referencia al primer anfitrión o responsable obligatorio.
     */
    @Column(name = "id_usuario", nullable = false)
    private long idUsuario;

    /**
     * Identificador numérico que referencia al segundo anfitrión o responsable obligatorio.
     */
    @Column(name = "id_usuario2", nullable = false)
    private long idUsuario2;

    /**
     * Identificador numérico que referencia al tercer anfitrión o responsable obligatorio.
     */
    @Column(name = "id_usuario3", nullable = false)
    private long idUsuario3;

    /**
     * Información textual detallada que describe las actividades o características del evento.
     */
    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;
}