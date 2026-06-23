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
 * Entidad de persistencia que representa un evento en el sistema.
 * Mapea directamente con la tabla 'eventos' de la base de datos mdem.
 * 
 * @author Ismae
 * @version 1.0
 */
@Entity // Define que esta clase es una entidad de JPA
@Data   // Genera automaticamente getters y setters mediante Lombok
@Table(name = "eventos") // Especifica el nombre de la tabla en tu phpMyAdmin
public class Eventos {

    /**
     * Identificador unico del evento.
     * Llave primaria con propiedad AUTO_INCREMENT.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_eventos")
    private long idEventos;

    /**
     * Nombre descriptivo del evento (varchar(50)).
     */
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    /**
     * Fecha de realizacion del evento (tipo date en MySQL).
     */
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    /**
     * Identificador del usuario/lider encargado (bigint(20)).
     */
    @Column(name = "id_usuario", nullable = false)
    private long idUsuario;

    /**
     * Descripcion o detalles adicionales del evento (tipo text en MySQL).
     */
    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;
}