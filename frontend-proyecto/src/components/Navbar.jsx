import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Componente que renderiza el panel lateral de navegación (Navbar).
 * Recupera el estado de la sesión del usuario para mostrar su perfil,
 * provee enlaces de enrutamiento y gestiona el flujo de cierre de sesión.
 * 
 * @component
 * @returns {React.JSX.Element} Barra de navegación lateral con controles de usuario.
 */
export default function Navbar() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "Usuario",
    cargo: "Miembro"
  });

  /**
   * Efecto que se ejecuta al montar el componente para sincronizar el estado
   * local con los datos de sesión almacenados en el navegador.
   */
  useEffect(() => {
    const nombreGuardado = sessionStorage.getItem('usuarioNombre');
    const cargoGuardado = sessionStorage.getItem('usuarioCargo');

    if (nombreGuardado) {
      setUsuario({
        nombre: nombreGuardado,
        cargo: cargoGuardado || "Usuario Registrado"
      });
    }
  }, []);

  /**
   * Limpia el almacenamiento de sesión de la API del navegador
   * y redirige al usuario hacia la pantalla de autenticación.
   */
  const manejarCerrarSesion = () => {
    sessionStorage.clear();
    alert('Has cerrado sesión correctamente.');
    navigate('/login');
  };

  return (
    <aside className="panel-lateral">
      
      <div className="perfil-usuario">
        <div className="capsula-nombre">
          <span className="icono-usuario">👤</span>
          <span className="texto-nombre">{usuario.nombre}</span>
        </div>
      </div>

      <nav className="menu-navegacion">
        <Link to="/crear_evento" className="enlace-navegacion">
          Crear Evento
        </Link>
        <Link to="/administrar_evento" className="enlace-navegacion">
          Administrar Evento
        </Link>
      </nav>

      <div className="branding-inferior">
        <div className="logo-sistema">
          <img src="/Logo_MDM.png" alt="Logo MDM" className="logo-proyecto" />
        </div>
        
        <div className="texto-rol">
          <span>{usuario.cargo}</span>
          <p style={{ marginTop: '5px', fontSize: '0.85rem', opacity: 0.7 }}>Manager de Ministerios</p>
        </div>

        <button 
          type="button" 
          onClick={manejarCerrarSesion} 
          className="boton-cerrar-sesion"
        >
          Cerrar Sesión
        </button>
      </div>

    </aside>
  );
}