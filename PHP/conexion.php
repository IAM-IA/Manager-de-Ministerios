<?php
// Parámetros de configuración del servidor de base de datos
$host = "localhost";
$user = "root";
$password = "";
$database = "mdm";

// Inicialización de la conexión mediante la interfaz MySQLi
$conexion = new mysqli($host, $user, $password, $database);

// Validación de estado de la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>