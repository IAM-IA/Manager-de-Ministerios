package com.mdm.login.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

/**
 * Entidad de persistencia que representa a un usuario registrado dentro del sistema.
 * Mapea las propiedades de la cuenta con los campos correspondientes de la base de datos relacional.
 * Cuenta con configuraciones ORM para el manejo de llaves primarias, unicidad de cuentas 
 * y longitudes máximas admisibles.
 * 
 * @author ismae
 * @version 1.0
 */
@Entity
@Data
@Table(name = "usuarios")
public class Usuario {
    
    /**
     * Identificador único autoincremental asignado a la cuenta de usuario.
     * Representa la clave primaria de la tabla relacional.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    /**
     * Nombre completo y apellidos del usuario registrado.
     */
    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;
    
    /**
     * Dirección de correo electrónico asociada al usuario.
     * Actúa como identificador único y obligatorio para los procesos de inicio de sesión.
     */
    @Column(name = "correo", unique = true, nullable = false, length = 100)
    private String correo;
    
    /**
     * Clave secreta o cadena de autenticación de seguridad utilizada para validar el acceso.
     */
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
    
    /**
     * Clasificación o rol administrativo asignado para gestionar los permisos dentro de la aplicación.
     */
    @Column(name = "rol", nullable = false, length = 30)
    private String rol;
}