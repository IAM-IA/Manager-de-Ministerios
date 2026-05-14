<?php
// Control de acceso y gestión de sesión
session_start();

if (!isset($_SESSION['usuario_nombre'])) {
    header("Location: http://localhost/MDM/HTML/inicio_sesion.html");
    exit();
}

$nombre_usuario = $_SESSION['usuario_nombre'];
$cargo_usuario = $_SESSION['usuario_cargo'];

// Configuración de zona horaria y traducción de fechas
date_default_timezone_set('America/Bogota');

$meses_espanol = [
    1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
    5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
    9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
];

// Cálculo de estados para el calendario dinámico
$numero_mes = (int)date('m');
$nombre_mes_actual = $meses_espanol[$numero_mes] . " " . date('Y');

$dia_actual = (int)date('d');
$total_dias_mes = (int)date('t');
$primer_dia_semana = (int)date('N', strtotime(date('Y-m-01')));
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Principal</title>
    <link rel="stylesheet" href="../CSS/principal.css">
</head>
<body>

    <div class="interfaz-escritorio">
        
        <!-- Panel de navegación e identidad de usuario -->
        <aside class="panel-lateral">
            <div class="perfil-usuario">
                <div class="capsula-nombre">
                    <span class="icono-usuario">👤</span>
                    <span class="texto-nombre"><?php echo htmlspecialchars($nombre_usuario); ?></span>
                </div>
            </div>

            <div class="branding-inferior">
                <div class="logo-sistema">
                    <img src="../IMG/Logo MDM.png" alt="Logo MDM" class="logo-proyecto">
                </div>
                <div class="texto-rol"><?php echo htmlspecialchars($cargo_usuario); ?></div>
            </div>
        </aside>

        <!-- Área de visualización de contenidos -->
        <div class="contenido-principal">
            <header class="cabecera-modulo">
                <h1 class="titulo-principal"><?php echo $nombre_mes_actual; ?></h1>
            </header>

            <div class="distribucion-columnas">
                
                <!-- Componente de visualización del mes actual -->
                <main class="bloque-calendario">
                    <div class="grilla-dias">
                        <?php
                        // Generación de casillas de alineación al inicio del mes
                        for ($i = 1; $i < $primer_dia_semana; $i++) {
                            echo '<div class="dia-tarjeta vacio"></div>';
                        }

                        // Renderizado de casillas numéricas con resaltado del día actual
                        for ($dia = 1; $dia <= $total_dias_mes; $dia++) {
                            $clase_hoy = ($dia === $dia_actual) ? ' hoy' : '';
                            echo '<div class="dia-tarjeta' . $clase_hoy . '">' . $dia . '</div>';
                        }
                        ?>
                    </div>
                </main>

                <!-- Panel informativo de compromisos mensuales -->
                <section class="contenedor-eventos">
                    <h2 class="subtitulo-eventos">Eventos próximos</h2>
                    <div class="lista-eventos">
                        <div class="tarjeta-evento">
                            <div class="dia-evento">9</div>
                            <div class="detalle-evento">Servicio de Anfitrión</div>
                        </div>
                        <div class="tarjeta-evento">
                            <div class="dia-evento">17</div>
                            <div class="detalle-evento">Reunión de Anfitriones</div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>

</body>
</html>