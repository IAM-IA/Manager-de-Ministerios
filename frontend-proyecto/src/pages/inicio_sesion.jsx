import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/inicio_sesion.css'
import Footer from '../components/Footer';

/**
 * Componente que renderiza el formulario de inicio de sesión.
 * Permite la captura de credenciales y efectúa la validación de acceso 
 * contra los servicios de autenticación expuestos en el backend.
 * 
 * @component
 * @returns {React.JSX.Element} Interfaz de inicio de sesión con validación de estados.
 */
export default function InicioSesion() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const navigate = useNavigate();

  /**
   * Maneja el proceso de autenticación del usuario enviando las credenciales
   * al servidor. Si la respuesta es exitosa, inicializa las variables de sesión.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const manejarLogin = async (e) => {
    e.preventDefault();

    const credenciales = {
      correo: correo,
      contrasena: contrasena
    };

    try {
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
      
      /**
       * Persiste el estado de la sesión localmente en el navegador para 
       * autorizar los accesos y personalizar la experiencia en rutas protegidas.
       */
      sessionStorage.setItem('usuarioNombre', usuario.nombre);
      sessionStorage.setItem('usuarioRol', usuario.rol);
      
      const cargoLegible = usuario.rol === 'LIDER' ? 'Líder de Ministerio' : 'Siervo / Anfitrión';
      sessionStorage.setItem('usuarioCargo', cargoLegible);
      
      navigate('/general'); 
      
    } catch (error) {
      alert('Error al iniciar sesión: Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="background-img">
      <div className="vista-login">
      
        <Link to="/">
          <img src="/flecha.png" className="boton-volver" alt="Volver a la página de bienvenida" />
        </Link>

        <header className="titulo-insesion">
          Iniciar Sesión
        </header>

        <form onSubmit={manejarLogin} className="formulario-ingresar">
              
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

          <button type="submit" className="boton-blanco-grande">Ingresar</button>
          <Link to="/registro" className="enlace-final">¿No tienes una cuenta?</Link>

        </form>

        <Footer />
      </div>
    </div>
  );
}