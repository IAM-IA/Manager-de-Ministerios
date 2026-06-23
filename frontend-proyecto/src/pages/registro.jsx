import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/registro.css'
import Footer from '../components/Footer'; // Importamos el Footer para la vista de registro

export default function Registro() {
  // Estados de React para capturar los datos de los inputs en tiempo real
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  // Hook de React Router para redirigir al usuario programáticamente
  const navigate = useNavigate();

  // Función lúdica que maneja el envío del formulario hacia tu backend
  const manejarRegistro = async (e) => {
    e.preventDefault(); // Evita que la página se recargue por completo

    // Objeto estructurado idéntico a los atributos de tu clase Usuario.java
    const datosUsuario = {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
      rol: rol
    };

    try {
      // Hacemos la petición POST apuntando directo al servidor local de Spring Boot (Puerto 8081)
      const respuesta = await fetch('http://localhost:8081/usuario/nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      });

      if (respuesta.ok) {
        alert('Usuario registrado exitosamente en la base de datos.');
        navigate('/login'); // Redirección interna a la vista de Login en React
      } else {
        alert('Error al registrar el usuario. Comprueba si el correo ya existe.');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('No se pudo conectar con el servidor de la base de datos de Spring Boot.');
    }
  };

  return (
    <div className="background-img">
      <div className="vista-registro">
      
        {/* Botón de retorno optimizado con Link apuntando a la raíz */}
        <Link to="/">
          <img src="/flecha.png" className="boton-volver" alt="Volver a inicio" />
        </Link>

        {/* Encabezado del módulo de registro */}
        <header className="titulo-registro">
          Registro
        </header>

        {/* Formulario conectado a la función onSubmit de React */}
        <form onSubmit={manejarRegistro} className="formulario-registro">
          
          {/* Campos enlazados con sus respectivos estados */}
          <input 
            type="text" 
            placeholder="Nombre Completo..." 
            className="campo" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required 
          />
          
          <input 
            type="email" 
            placeholder="Correo Electrónico..." 
            className="campo" 
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required 
          />

          {/* Selección de rol de usuario */}
          <p className="pregunta">¿Qué eres en tu iglesia?</p>

          {/* CORREGIDO: Cambiado 'class' por 'className' */}
          <div className="contenedor-opciones">
            <label className="opcion-blanca">
              <input 
                type="radio" 
                name="rol" 
                value="SIERVO" 
                checked={rol === 'SIERVO'}
                onChange={(e) => setRol(e.target.value)}
                required 
              />
              <span>Siervo</span>
            </label>
            <label className="opcion-blanca">
              <input 
                type="radio" 
                name="rol" 
                value="LIDER" 
                checked={rol === 'LIDER'}
                onChange={(e) => setRol(e.target.value)}
              />
              <span>Líder</span>
            </label>
          </div>

          {/* Credenciales de acceso de seguridad */}
          <input 
            type="password" 
            placeholder="Contraseña..." 
            className="campo" 
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required 
          />
          <p className="texto-pequeno">¡Recuerda la contraseña, la necesitarás después!</p>

          {/* Controles de envío y navegación interna */}
          <button type="submit" className="boton-blanco-grande">Guardar</button>
          <Link to="/login" className="enlace-final">¿Ya tienes una cuenta?</Link>
        </form>

        {/* Insertamos el Footer al final de la pantalla de registro */}
        <Footer />
      </div>
    </div>
  );
}