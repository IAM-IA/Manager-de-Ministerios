# 📅 Manager de Ministerios (MDM)

Aplicación web interactiva diseñada para la gestión, planeación y asignación de eventos ministeriales en un calendario dinámico. El sistema implementa un control de accesos estricto basado en roles (Líder de Ministerio y Siervo) para segmentar las funciones de administración y visualización, facilitando la comunicación interna y asegurando el seguimiento de las actividades.

La interfaz ha sido desarrollada bajo un enfoque de alta usabilidad, garantizando una experiencia intuitiva y sencilla para personas de mayor edad o con poco dominio de la tecnología.

---

## 👥 Control de Accesos y Permisos (Interfaz Múltiple)

El software adapta su interfaz de forma dinámica según el rol del usuario autenticado y el ministerio al que pertenece:

*   **Rol Líder de Ministerio (Administrador):**
    *   Acceso completo al calendario para la creación de eventos en fechas seleccionadas.
    *   Asignación de usuarios Siervos responsables a cada evento.
    *   Bandeja exclusiva para la visualización y gestión de comentarios recibidos.
*   **Rol Siervo (Colaborador):**
    *   Restricción total para la creación o modificación de eventos.
    *   Visualización exclusiva de los eventos en los que se encuentra registrado como participante.
    *   Sección de comentarios habilitada en cada evento para contactar directamente al Líder de Ministerio.

---

## 📋 Requisitos del Sistema

### Requisitos Funcionales
*   **Módulo de Autenticación (Login):** Sistema de registro para nuevos usuarios con selección de rol (Líder de Ministerio / Siervo) y almacenamiento seguro de perfiles para ingresos posteriores.
*   **Calendario Automatizado:** Interfaz con fechas actualizadas que permite al Líder registrar actividades y salvar la información de manera permanente.
*   **Canal de Comunicación (Comentarios):** Mensajería integrada dentro de los eventos para que los Siervos envíen observaciones directas al Líder del Ministerio.
*   **Persistencia de Datos (Base de Datos):** Conexión a un sistema de base de datos para almacenar las fechas, eventos y perfiles de usuario de forma íntegra.
*   **Sistema de Alertas (Notificaciones):** Módulo de recordatorios automáticos que avisa a los usuarios encargados con días de anticipación antes de la ejecución del evento.

### Requisitos No Funcionales
*   **Diseño Accesible:** Interfaz gráfica limpia, simple y de fácil navegación para reducir la curva de aprendizaje en adultos mayores.
*   **Rendimiento Óptimo:** Procesamiento de solicitudes ágil y despliegue rápido de la información del calendario.
*   **Estabilidad del Sistema:** Arquitectura robusta configurada para mitigar caídas del servidor, prevenir errores de escritura en la base de datos y controlar eficientemente los picos de uso masivo.
*   **Mantenimiento Sostenible:** Código estructurado que facilita la vigilancia continua, depuración de errores en tiempo de ejecución y futuras actualizaciones de desarrollo.
---

## 📂 Estructura del Proyecto (Arquitectura de Directorios)

El proyecto organiza sus archivos distribuyendo el código, los estilos y los recursos multimedia en tres carpetas principales en la raíz del repositorio:

├── README.md               # Documentación general del sistema
├── CSS/
│   ├── index.css           # Estilos de la página de bienvenida
│   ├── inicio_sesion.css   # Estilos del módulo de autenticación
│   ├── registro.css        # Estilos del módulo de registro de usuarios
│   └── principal.css       # Estilos del panel de escritorio del calendario
├── HTML/
│   ├── index.html          # Pantalla de bienvenida y acceso principal
│   ├── inicio_sesion.html  # Formulario de inicio de sesión
│   ├── registro.html       # Formulario de registro de cuentas
│   └── principal.php       # Panel del calendario dinámico con control de sesión
├── PHP/
│   ├── conexion.php        # Script de conexión centralizada a MySQL (BD: mdm)
│   ├── envio_registro.php  # Controlador para el procesamiento de nuevos usuarios
│   └── login.php           # Controlador para la autenticación y apertura de sesiones
└── IMG/
    ├── flecha.png          # Icono de navegación gráfica / retorno
    ├── fondo intro.png     # Imagen de fondo para las interfaces de acceso
    ├── Logo MDM.png        # Identidad visual de Manager De Ministerios
    └── logoSena.png        # Logotipo institucional (SENA)

---

## 🛠️ Tecnologías del Lado del Cliente (Frontend)

*   **HTML**: Arquitectura estructurada de las páginas mediante formularios de ingreso, selectores de rol y manejo de hipervínculos relacionales.
*   **CSS**: Hojas de estilo en cascada para la maquetación visual, diseño de botones interactivos y gestión de interfaces limpias orientadas al usuario final (Adulto Mayor).

---

## 🖥️ Tecnologías del Lado del Servidor y Persistencia (Backend)

*   **PHP**: Lenguaje encargado de la lógica de negocio, validación estricta de variables en peticiones `POST`, procesamiento dinámico de la grilla del calendario mensual y administración de variables globales de sesión (`session_start()`).
*   **MySQL**: Sistema de gestión de bases de datos relacionales utilizado para el almacenamiento persistente de registros de usuarios en la tabla `usuario`.
*   **Mecanismos de Seguridad (BCrypt)**: Implementación de la función nativa `password_hash()` y `password_verify()` para mitigar el almacenamiento de contraseñas en texto plano y asegurar los hashes cifrados en la base de datos.

---

## 🗄️ Estructura de la Base de Datos (MySQL)

El sistema opera sobre una base de datos relacional llamada `mdm`. A continuación, se detalla la estructura física exacta de la tabla de persistencia utilizada en el entorno de desarrollo:

```sql
CREATE DATABASE IF NOT EXISTS mdm;
USE mdm;

CREATE TABLE IF NOT EXISTS usuario (
    Id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    rol ENUM('líder', 'siervo') NOT NULL
);
```
---

## ⚙️ Instrucciones de Ejecución en Entorno Local (Despliegue)

Para desplegar y ejecutar la aplicación de forma local, es necesario contar con un entorno de desarrollo de pila local (como XAMPP, Laragon o WampServer).

1.  **Clonar o mover** la carpeta completa del proyecto (`MDM`) dentro del directorio raíz de publicación de tu servidor local (en XAMPP la ruta obligatoria es `C:/xampp/htdocs/`).
2.  **Iniciar los servicios** desde el panel de control de tu software de servidor local (activar módulos **Apache** y **MySQL**).
3.  **Montar la base de datos**: Acceder a `http://localhost/phpmyadmin/`, crear una base de datos llamada `mdm` y estructurar la tabla `usuario` (con columnas para `id`, `nombre`, `correo`, `rol`, y `password`).
4.  **Ejecutar en el navegador**: No abrir los archivos con doble clic. Acceder estrictamente mediante la dirección URL del servidor local:
    *   `http://localhost/MDM/HTML/index.html`

---

## 🔑 Módulo de Autenticación (Inicio de Sesión)

La interfaz de inicio de sesión (`inicio_sesion.html`) actúa como el punto de validación de seguridad del sistema. Su objetivo técnico es recopilar las credenciales de los usuarios para verificar su identidad en la base de datos y otorgar los permisos correspondientes (Líder de Ministerio o Siervo).

### Componentes y Flujo de Interfaz
*   **Campos de Captura**: Implementa entradas nativas optimizadas para formatos de correo electrónico (`type="email"`) y ocultamiento de caracteres confidenciales (`type="password"`).
*   **Control de Navegación**: Incorpora un botón de retorno rápido (`flecha.png`) conectado directamente con la raíz del módulo de bienvenida (`index.html`) para evitar callejones sin salida en la experiencia de usuario.
*   **Enrutamiento Cruzado**: Enlace directo hacia la interfaz de inscripción (`registro.html`) para aquellos usuarios que no posean credenciales vigentes en el sistema.

---

## 🛡️ Seguridad y Control de Sesión

La aplicación implementa una capa de seguridad basada en el estado de las sesiones del servidor:
*   **Validación de Sesión Activa:** El archivo `principal.php` verifica mediante `session_start()` la existencia de las variables globales de autenticación. Si un usuario intenta forzar la URL directamente en el navegador sin haberse logueado, el servidor intercepta la petición y lo redirige automáticamente hacia `inicio_sesion.html`.
*   **Mitigación de Inyecciones de Código:** Toda inserción y consulta en la base de datos se ejecuta mediante sentencias preparadas (`prepare` y `bind_param`), evitando ataques de inyección SQL (SQLi).

---

## 📝 Módulo de Registro (Inscripción de Usuarios)

La interfaz de creación de cuentas (`registro.html`) es el punto de entrada de nuevos perfiles al sistema. Su función primordial es recopilar la información básica del usuario y obligarlo a declarar su rol operativo dentro de la iglesia para configurar sus privilegios de acceso desde el primer momento.

### Componentes y Lógica de Negocio
*   **Campos de Identidad**: Captura cadenas de texto plano para nombres y formatos validados para correos electrónicos.
*   **Asignación de Roles**: Utiliza botones de selección única (`type="radio"`) bajo el identificador común `name="cargo"`. Esto restringe la elección a un solo rol por perfil (Líder o Siervo), vinculándose directamente con los requerimientos funcionales de permisos definidos en el sistema.
*   **Validación Cruzada**: Cuenta con un enlace directo hacia la interfaz de inicio de sesión (`inicio_sesion.html`) para derivar el flujo en caso de que el usuario ya se encuentre registrado en la base de datos.