# 📅 Manager de Ministerios (MDM)

Aplicación web interactiva diseñada para la gestión, planeación y asignación de eventos ministeriales en un calendario dinámico. El sistema implementa un control de accesos estricto basado en roles (Líder de Ministerio y Siervo) para segmentar las funciones de administración y visualización, facilitando la comunicación interna y asegurando el seguimiento de las actividades.

La interfaz ha sido desarrollada bajo un enfoque de alta usabilidad, garantizando una experiencia intuitiva y sencilla para personas de mayor edad o con poco dominio de la tecnología.

---

## 👥 Control de Accesos y Permisos (Interfaz Múltiple)

El software adapta su comportamiento y vistas de forma dinámica según el rol del usuario autenticado, recuperado de forma persistente desde el almacenamiento local de la sesión:

*   **Líder de Ministerio (Rol: `LIDER`):**
    *   Acceso completo al módulo de creación y estructuración de eventos.
    *   Capacidad de asignar de forma obligatoria los tres (3) anfitriones requeridos por evento.
    *   Privilegios avanzados para la administración y modificación de las actividades en el repositorio de datos.
*   **Siervo / Anfitrión (Rol: `SIERVO`):**
    *   Visualización exclusiva de los bloques y eventos próximos en el panel general.
    *   Flujos de validación visual adaptados en el calendario según la fecha vigente del sistema.
    *   Restricción perimetral en las interfaces de captura para evitar la manipulación no autorizada de registros.

---

## 📋 Requisitos del Sistema

### Requisitos Funcionales
*   **Módulo de Autenticación Centralizado:** Captura de credenciales, autenticación agnóstica de mayúsculas mediante Streams y asignación de etiquetas legibles en sesión (`Líder de Ministerio` o `Siervo / Anfitrión`).
*   **Calendario Dinámico Automatizado:** Renderizado en grilla bidimensional basado en el tiempo real del sistema (`java.time.LocalDate` y objeto `Date` nativo), con cálculo de desbordamiento de días y ajuste de índice semanal.
*   **Control de Duplicidad de Anfitriones:** Lógica perimetral en el cliente que filtra y deshabilita selectores previos para impedir de forma estricta la asignación del mismo usuario en múltiples roles de un mismo evento.
*   **Persistencia Relacional Avanzada:** Mapeo de objetos de negocio con tipos de datos específicos de base de datos (columnas `TEXT` para descripciones largas y restricciones de unicidad).
*   **Cierre de Sesión Seguro:** Mecanismo de invalidación completa de la API del navegador (`sessionStorage.clear()`) con redirección inmediata al flujo de login para mitigar accesos por historial.

### Requisitos No Funcionales
*   **Arquitectura Desacoplada (Decoupled Architecture):** Separación absoluta entre la capa de presentación (Single Page Application con React) y la capa de servicios empresariales (REST API con Spring Boot).
*   **Mapeo de Datos Tipado (ORM):** Persistencia gestionada mediante JPA e Hibernate, abstrayendo las consultas SQL nativas a través de interfaces genéricas reutilizables.
*   **Modularidad Estructurada:** Código JavaScript documentado bajo el estándar internacional **JSDoc** y código Java estructurado bajo el estándar **Javadoc** para garantizar mantenimiento sostenible y autogeneración de documentación.
*   **Diseño de Grilla Bidimensional:** Maquetación CSS estructurada mediante combinaciones de *Flexbox* y *CSS Grid Layout*, garantizando la alineación perfecta de las tarjetas informativas sin desfasar los contenedores.

---

## 📂 Estructura Arquitectónica del Proyecto

El ecosistema se encuentra dividido de forma estricta en dos repositorios o carpetas independientes para segmentar las responsabilidades de desarrollo:

### 🌐 1. Carpeta Frontend (`frontend-proyecto`)
Desarrollado en React con Vite, gestionando un enrutamiento del lado del cliente y estilos modulares.
```text
frontend-proyecto/
├── src/
│   ├── App.jsx             # Enrutador global y mapeo de rutas URL (React Router)
│   ├── main.jsx            # Punto de entrada principal y montaje del árbol en el DOM
│   ├── components/
│   │   ├── Navbar.jsx      # Panel lateral de navegación con estado de sesión y logout
│   │   └── Footer.jsx      # Pie de página institucional con branding del proyecto y SENA
│   ├── pages/
│   │   ├── index.jsx       # Pantalla de inicio, bienvenida y accesos principales
│   │   ├── registro.jsx    # Formulario de inscripción y alta de nuevos usuarios
│   │   ├── inicio_sesion.jsx # Interfaz de captura de credenciales y login asíncrono
│   │   └── general.jsx     # Panel de escritorio con calendario dinámico y eventos
│   └── css/
│       ├── index.css       # Estilos globales, degradados y vistas de bienvenida
│       ├── registro.css    # Diseño de selectores simulados de rol y transiciones
│       ├── inicio_sesion.css # Contenedores translúcidos y botones de retorno fijos
│       ├── general.css     # Estilos de la Navbar, grilla del calendario y tarjetas
│       └── crear_evento.css # Grid Layout dinámico en columnas para el formulario
```

### ☕ 2. Carpeta Backend (`backend-proyecto`)
Desarrollado en Java con Spring Boot, estructurado bajo el patrón de arquitectura en capas (Controlador - Servicio - Repositorio - Modelo).
```text
backend-proyecto/
└── src/main/java/com/mdm/login/
    ├── controller/
    │   ├── UsuarioController.java   # Endpoints REST para usuarios y lógica de autenticación
    │   └── EventosController.java   # Endpoints REST para operaciones CRUD de actividades
    ├── service/
    │   ├── UsuarioServices.java     # Contrato abstracto para la lógica de usuarios
    │   ├── UsuarioServicesImpl.java # Implementación concreta y persistencia de usuarios
    │   ├── EventosServices.java     # Contrato abstracto para la gestión de eventos
    │   └── EventosServicesImpl.java # Lógica de validación previa y mutación de eventos
    ├── repository/
    │   ├── UsuarioRepository.java   # Abstracción de datos con JpaRepository para usuarios
    │   └── EventosRepository.java   # Abstracción de datos con JpaRepository para eventos
    └── model/
        ├── Usuario.java             # Entidad de persistencia ORM para la tabla 'usuarios'
        └── Eventos.java             # Entidad de persistencia ORM para la tabla 'eventos'
```

---

## 🛠️ Stack Tecnológico Utilizado

### Servidor y Persistencia (Backend)
*   **Java SE (JDK 17+) & Spring Boot**: Framework core para el levantamiento del microservicio REST.
*   **Spring Data JPA / Hibernate**: Implementación de Object-Relational Mapping (ORM) para la gestión automatizada de las transacciones SQL.
*   **Lombok**: Biblioteca de optimización de código para la inyección de código (*boilerplate*) en tiempo de compilación (`@Data`).
*   **MySQL & phpMyAdmin**: Motor de base de datos relacional para el almacenamiento persistente de los esquemas.

### Cliente e Interfaz (Frontend)
*   **React (Vite)**: Librería JavaScript para la construcción de interfaces de usuario basadas en componentes declarativos y reactivos.
*   **React Router Dom**: Manejador oficial para el enrutamiento dinámico SPA (*Single Page Application*).
*   **HTML5 Semántico**: Empleo de etiquetas semánticas (`aside`, `nav`, `main`, `section`, `header`, `label`) validadas bajo los estándares técnicos de desarrollo.
*   **CSS3 Avanzado**: Estilos basados en metodologías de diseño modernas (*CSS Grid, Flexbox, Pseudo-clases `:checked` y pseudo-elementos*).

---

## 🗄️ Modelo Relacional y Persistencia Física (MySQL)

El motor ORM Hibernate de Spring Boot interactúa con las especificaciones del esquema físico mapeado. A continuación se detallan las estructuras persistidas en la base de datos `mdm`:

```sql
CREATE DATABASE IF NOT EXISTS mdm;
USE mdm;

-- Tabla: usuarios (Persistida mediante Usuario.java)
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL
);

-- Tabla: eventos (Persistida mediante Eventos.java)
CREATE TABLE IF NOT EXISTS eventos (
    id_eventos BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    id_usuario BIGINT NOT NULL,
    id_usuario2 BIGINT NOT NULL,
    id_usuario3 BIGINT NOT NULL,
    descripcion TEXT NOT NULL
);
```

---

## ⚙️ Instrucciones de Despliegue Local (Entorno de Desarrollo)

Para levantar el ecosistema completo en tu máquina local, sigue de forma estricta los siguientes pasos:

### 1. Preparación de la Base de Datos
1. Abre tu panel de control local (**XAMPP, Laragon o WampServer**).
2. Inicializa los servicios de **Apache** y **MySQL**.
3. Navega a `http://localhost/phpmyadmin/`, crea una base de datos vacía llamada `mdm`. *Nota: Spring Boot generará o validará las tablas de forma automática al iniciar.*

### 2. Ejecución del Servidor (Backend)
1. Importa la carpeta `backend-proyecto` en tu IDE de preferencia (**NetBeans, IntelliJ IDEA o VS Code**).
2. Asegúrate de tener configurado el puerto `8081` en tu archivo `src/main/resources/application.properties` para concordar con los *fetches* del cliente:
   ```properties
   server.port=8081
   spring.datasource.url=jdbc:mysql://localhost:3006/mdm
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contrasena
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Ejecuta el proyecto. La API REST quedará escuchando peticiones en `http://localhost:8081`.

### 3. Ejecución del Cliente (Frontend)
1. Abre una terminal de comandos apuntando directamente a la raíz de la carpeta `frontend-proyecto`.
2. Instala el árbol de dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```
3. Abre tu navegador web e ingresa a la dirección URL local provista por Vite, la cual está autorizada en la anotación `@CrossOrigin` del backend:
   *   `http://localhost:5173`

---

## 🔑 Especificaciones de los Módulos Críticos

*   **Módulo de Autenticación (`/login`):** Intercepta las peticiones enviando payloads JSON estructurados. Valida la coincidencia exacta de contraseñas y almacena de forma segura los atributos del usuario en el objeto `sessionStorage` para inicializar el estado del menú lateral.
*   **Módulo de Registro (`/registro`):** Provee una interfaz con botones de selección de rol simulados visualmente mediante CSS sobre inputs ocultos, lo que permite un entorno gráfico moderno, capturando las llaves de seguridad requeridas por el modelo del sistema.
*   **Módulo de Creación de Eventos (`/crear_evento`):** Implementa validaciones encadenadas en tiempo real. Al seleccionar los anfitriones, los hooks de React modifican el DOM para limpiar de forma automática selectores secundarios, asegurando la integridad relacional de JPA antes de enviar la petición `POST`.