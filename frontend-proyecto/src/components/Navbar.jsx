import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  // Variables de estado estándares para los datos del usuario
  const [usuario, setUsuario] = useState({
    nombre: "Usuario",
    cargo: "Miembro"
  });

  useEffect(() => {
    // Al cargar el menú, leemos los datos reales guardados en el Login
    const nombreGuardado = sessionStorage.getItem('usuarioNombre');
    const cargoGuardado = sessionStorage.getItem('usuarioCargo');

    if (nombreGuardado) {
      setUsuario({
        nombre: nombreGuardado,
        cargo: cargoGuardado || "Usuario Registrado"
      });
    }
  }, []);

  // Función para borrar la sesión y salir al Login
  const manejarCerrarSesion = () => {
    sessionStorage.clear();
    alert('Has cerrado sesión correctamente.');
    navigate('/login');
  };

  return (
    <aside className="panel-lateral">
      
      {/* Bloque 1: Perfil (Arriba) */}
      <div className="perfil-usuario">
        <div className="capsula-nombre">
          <span className="icono-usuario">👤</span>
          <span className="texto-nombre">{usuario.nombre}</span>
        </div>
      </div>

      {/* Bloque 2: Menú de navegación (Centro) */}
      <nav className="menu-navegacion">
        <Link to="/crear_evento" className="enlace-navegacion">
          Crear Evento
        </Link>
        <Link to="/administrar_evento" className="enlace-navegacion">
          Administrar Evento
        </Link>
      </nav>

      {/* Bloque 3: Todo el grupo inferior (Se irá directo al piso) */}
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