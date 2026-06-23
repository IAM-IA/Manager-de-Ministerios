package com.mdm.login.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

/**
 * Entidad de persistencia que representa a un usuario en el sistema.
 * Mapea directamente con la tabla 'usuarios' de la base de datos.
 * 
 * @author ismae
 * @version 1.0
 */
@Entity // Define que esta clase es una entidad de JPA
@Data   // Genera automáticamente getters y setters mediante Lombok
@Table(name = "usuarios") // Especifica el nombre de la tabla en la base de datos
public class Usuario {
    /**
     * Identificador unico del usuario.
     */
    @Id // Define la llave primaria de la tabla
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura el ID como autoincremental
    private long id;
    /**
     * Nombre completo del usuario.
     */
    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;
    /**
     * Correo electronico unico para el inicio de sesion.
     */
    @Column(name = "correo", unique = true, nullable = false, length = 100)
    private String correo;
    /**
     * Contrasena encriptada del usuario.
     */
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
    /**
     * Rol asignado dentro de la aplicacion.
     */
    @Column(name = "rol", nullable = false, length = 30)
    private String rol;
}