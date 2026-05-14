<?php
// Inicialización del entorno de sesiones nativas
session_start();

// Importación del módulo de conexión a la base de datos
require_once "conexion.php";

// Procesamiento de la petición de autenticación mediante método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password_plana = $_POST['password'] ?? '';

    // Validación de obligatoriedad de credenciales
    if (empty($email) || empty($password_plana)) {
        die("Por favor, llene todos los campos.");
    }

    // Consulta de verificación de identidad basada en el correo electrónico
    $sql = "SELECT id, nombre, rol, password FROM usuario WHERE correo = ?";
    $stmt = $conexion->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        // Evaluación de existencia del registro en la base de datos
        if ($resultado->num_rows === 1) {
            $usuario = $resultado->fetch_assoc();

            // Verificación algorítmica de la contraseña con el hash almacenado
            if (password_verify($password_plana, $usuario['password'])) {
                
                // Persistencia de datos de usuario en variables de sesión globales
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nombre'] = $usuario['nombre'];
                $_SESSION['usuario_cargo'] = $usuario['rol'];

                // Redirección hacia el módulo principal de la aplicación
                header("Location: http://localhost/MDM/HTML/principal.php");
                exit();
                
            } else {
                echo "La contraseña es incorrecta.";
            }
        } else {
            echo "El correo electrónico no está registrado.";
        }

        $stmt->close();
    } else {
        echo "Error en la consulta: " . $conexion->error;
    }
}

// Cierre del canal de comunicación con la base de datos
$conexion->close();
?>