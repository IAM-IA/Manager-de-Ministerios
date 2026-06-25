import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/crear_evento.css';

/**
 * Componente que renderiza el formulario para la creación de un nuevo evento.
 * Gestiona la selección obligatoria de tres anfitriones distintos consumiendo
 * servicios de un backend en Spring Boot.
 * 
 * @component
 * @returns {React.JSX.Element} Interfaz de usuario para registrar un evento.
 */
export default function CrearEvento() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [responsable1, setResponsable1] = useState('');
  const [responsable2, setResponsable2] = useState('');
  const [responsable3, setResponsable3] = useState('');

  const [usuariosBD, setUsuariosBD] = useState([]);

  useEffect(() => {
    const traerUsuarios = async () => {
      try {
        const respuesta = await fetch('http://localhost:8081/usuario/mostrar');
        if (respuesta.ok) {
          const listaDeUsuarios = await respuesta.json();
          setUsuariosBD(listaDeUsuarios); 
        }
      } catch (error) {
        console.error("Error al conectar con el backend de Spring Boot:", error);
      }
    };

    traerUsuarios();
  }, []); 

  /**
   * Procesa el envío del formulario, estructura la carga útil requerida por JPA
   * y efectúa la petición POST de persistencia.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const manejarCrearEvento = async (e) => {
    e.preventDefault();

    const nuevoEvento = {
      nombre: nombre,
      fecha: fecha,
      descripcion: descripcion,
      idUsuario: Number(responsable1),
      idUsuario2: Number(responsable2),
      idUsuario3: Number(responsable3)
    };

    try {
      const respuesta = await fetch('http://localhost:8081/eventos/nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoEvento)
      });

      if (respuesta.ok) {
        alert('¡Evento creado exitosamente con sus 3 anfitriones requeridos!');
        navigate('/general');
      } else {
        alert('Error al intentar crear el evento. Revisa la integridad en la BD.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor de Spring Boot.');
    }
  };

  return (
    <div className="interfaz-escritorio">
      <Navbar />

      <div className="contenido-principal contenedor-centrado-formulario">
        
        <header className="cabecera-modulo">
          <h1 className="titulo-principal">Crear Evento</h1>
        </header>

        <div className="tarjeta-formulario-azul">
          <form onSubmit={manejarCrearEvento} className="formulario-evento-interno">
            
            <div className="grilla-formulario">
              
              <div className="grupo-input campo-nombre">
                <input 
                  type="text" 
                  placeholder="Nombre del evento..." 
                  className="campo-redondo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required 
                />
              </div>

              <div className="grupo-input campo-fecha">
                <input 
                  type="date" 
                  className="campo-redondo selector-interno"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required 
                />
              </div>

              <div className="grupo-input campo-descripcion">
                <textarea 
                  placeholder="Descripción del evento..." 
                  className="campo-redondo area-texto"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>

              <div className="grupo-input campo-anfitrion1">
                <label className="etiqueta-formulario">Anfitrión 1 (Obligatorio)</label>
                <select 
                  className="campo-redondo selector-interno"
                  value={responsable1}
                  onChange={(e) => {
                    setResponsable1(e.target.value);
                    if(responsable2 === e.target.value) setResponsable2('');
                    if(responsable3 === e.target.value) setResponsable3('');
                  }}
                  required
                >
                  <option value="">Selecciona el anfitrión principal...</option>
                  {usuariosBD.map((usuario) => (
                    <option key={`resp1-${usuario.id}`} value={usuario.id}>
                      {usuario.nombre} ({usuario.rol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grupo-input campo-anfitrion2">
                <label className="etiqueta-formulario">Anfitrión 2 (Obligatorio)</label>
                <select 
                  className="campo-redondo selector-interno"
                  value={responsable2}
                  onChange={(e) => {
                    setResponsable2(e.target.value);
                    if(responsable3 === e.target.value) setResponsable3('');
                  }}
                  required
                >
                  <option value="">Selecciona...</option>
                  {usuariosBD
                    .filter(u => String(u.id) !== responsable1) // Excluye el anfitrión seleccionado previamente para evitar duplicados.
                    .map((usuario) => (
                      <option key={`resp2-${usuario.id}`} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grupo-input campo-anfitrion3">
                <label className="etiqueta-formulario">Anfitrión 3 (Obligatorio)</label>
                <select 
                  className="campo-redondo selector-interno"
                  value={responsable3}
                  onChange={(e) => setResponsable3(e.target.value)}
                  required
                >
                  <option value="">Selecciona...</option>
                  {usuariosBD
                    .filter(u => String(u.id) !== responsable1 && String(u.id) !== responsable2) // Excluye los dos anfitriones seleccionados previamente para evitar duplicados.
                    .map((usuario) => (
                      <option key={`resp3-${usuario.id}`} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))}
                </select>
              </div>

            </div>

            <button type="submit" className="boton-crear-blanco">
              Crear Evento
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}