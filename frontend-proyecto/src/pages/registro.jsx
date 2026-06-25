import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/registro.css'
import Footer from '../components/Footer';

/**
 * Componente que renderiza el formulario de registro de nuevos usuarios.
 * Captura información personal y el rol eclesiástico para dar de alta
 * registros en el sistema a través del backend.
 * 
 * @component
 * @returns {React.JSX.Element} Interfaz de registro con control de estados y selectores de rol.
 */
export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const navigate = useNavigate();

  /**
   * Envía los datos capturados del nuevo usuario al servicio de persistencia
   * del backend. Si el alta es correcta, redirige a la vista de inicio de sesión.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const manejarRegistro = async (e) => {
    e.preventDefault();

    const datosUsuario = {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
      rol: rol
    };

    try {
      const respuesta = await fetch('http://localhost:8081/usuario/nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      });

      if (respuesta.ok) {
        alert('Usuario registrado exitosamente en la base de datos.');
        navigate('/login');
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
      
        <Link to="/">
          <img src="/flecha.png" className="boton-volver" alt="Volver a inicio" />
        </Link>

        <header className="titulo-registro">
          Registro
        </header>

        <form onSubmit={manejarRegistro} className="formulario-registro">
          
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

          <p className="pregunta">¿Qué eres en tu iglesia?</p>

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

          <input 
            type="password" 
            placeholder="Contraseña..." 
            className="campo" 
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required 
          />
          <p className="texto-pequeno">¡Recuerda la contraseña, la necesitarás después!</p>

          <button type="submit" className="boton-blanco-grande">Guardar</button>
          <Link to="/login" className="enlace-final">¿Ya tienes una cuenta?</Link>
        </form>

        <Footer />
      </div>
    </div>
  );
}