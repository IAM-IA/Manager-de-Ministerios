import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function InicioSesion() {
  // Estados para capturar las credenciales de ingreso
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  // Hook para la redirección controlada dentro de React Router
  const navigate = useNavigate();

  // Función asíncrona para validar el acceso con el backend de Spring Boot
  const manejarLogin = async (e) => {
    e.preventDefault(); // Detiene el refresco nativo del formulario

    const credenciales = {
      correo: correo,
      contrasena: contrasena
    };

    try {
      // Petición POST al endpoint de validación en tu backend
      const respuesta = await fetch('http://localhost:8081/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
      });

      if (!respuesta.ok) {
        throw new Error('Credenciales inválidas');
      }

      const usuario = await respuesta.json();
      alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);
      
      // ALMACENAMIENTO DE DATOS EN LA SESIÓN DEL NAVEGADOR
      sessionStorage.setItem('usuarioNombre', usuario.nombre);
      sessionStorage.setItem('usuarioRol', usuario.rol);
      
      // Asigna una etiqueta legible según el rol devuelto por Spring Boot
      const cargoLegible = usuario.rol === 'LIDER' ? 'Líder de Ministerio' : 'Siervo / Anfitrión';
      sessionStorage.setItem('usuarioCargo', cargoLegible);
      
      // Redirecciona al panel principal de tu sistema en React
      navigate('/general'); 
      
    } catch (error) {
      alert('Error al iniciar sesión: Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="vista-login">
      
      {/* Botón de retorno optimizado con Link apuntando al index */}
      <Link to="/">
        <img src="/flecha.png" className="boton-volver" alt="Volver a la página de bienvenida" />
      </Link>

      {/* Encabezado del módulo de inicio de sesión */}
      <header className="titulo-insesion">
        Iniciar Sesión
      </header>

      {/* Formulario conectado al controlador de React */}
      <form onSubmit={manejarLogin} className="formulario-ingresar">
            
        {/* Campos vinculados con sus respectivos estados de React */}
        <input 
          type="email" 
          placeholder="Correo Electrónico..." 
          className="campo" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required 
        />
        
        <input 
          type="password" 
          placeholder="Contraseña..." 
          className="campo" 
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required 
        />

        {/* Controles de envío y enlaces secundarios */}
        <button type="submit" className="boton-blanco-grande">Ingresar</button>
        <Link to="/registro" className="enlace-final">¿No tienes una cuenta?</Link>

      </form>

      {/* Insertamos el Footer al final de la pantalla de inicio de sesión */}
      <Footer />
    </div>
  );
}