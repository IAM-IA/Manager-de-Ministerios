<?php
// Importación del módulo de conexión a la base de datos
require_once "conexion.php";

// Procesamiento de la petición de registro mediante método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $cargo = $_POST['cargo'] ?? '';
    $password_plana = $_POST['password'] ?? '';

    // Validaciones estrictas de campos obligatorios
    if (empty($nombre)) { die("El campo 'nombre' está vacío."); }
    if (empty($email)) { die("El campo 'email' está vacío."); }
    if (empty($cargo)) { die("El campo 'cargo' está vacío (no seleccionaste Siervo o Líder correctamente)."); }
    if (empty($password_plana)) { die("El campo 'password' está vacío."); }

    // Cifrado seguro de la credencial de acceso mediante algoritmo BCrypt
    $password_encriptada = password_hash($password_plana, PASSWORD_BCRYPT);

    // Preparación y ejecución de la sentencia SQL de inserción
    $sql = "INSERT INTO usuario (nombre, correo, rol, password) VALUES (?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ssss", $nombre, $email, $cargo, $password_encriptada);
        
        if ($stmt->execute()) {
            echo "Registro guardado en la tabla usuario con éxito.";
        } else {
            echo "Error al insertar: " . $stmt->error;
        }
        
        $stmt->close();
    } else {
        echo "Error en la consulta: " . $conexion->error;
    }
}

// Cierre de la conexión activa con el servidor MySQL
$conexion->close();
?>