import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/crear_evento.css';

export default function CrearEvento() {
  const navigate = useNavigate();

  // 1. Variables de estado para el formulario
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [responsable1, setResponsable1] = useState('');
  const [responsable2, setResponsable2] = useState('');
  const [responsable3, setResponsable3] = useState('');

  // 2. NUEVA VARIABLE: Aquí guardaremos la lista de personas reales de la BD
  const [usuariosBD, setUsuariosBD] = useState([]);

  // 3. NUEVO BLOQUE: Va al backend a traer los usuarios registrados apenas carga la página
  useEffect(() => {
    const traerUsuarios = async () => {
      try {
        // Usamos el endpoint que tú mismo creaste en tu UsuarioController
        const respuesta = await fetch('http://localhost:8081/usuario/mostrar');
        if (respuesta.ok) {
          const listaDeUsuarios = await respuesta.json();
          setUsuariosBD(listaDeUsuarios); // Guardamos la gente real en el estado
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    traerUsuarios();
  }, []); // El array vacío [] hace que solo busque los usuarios una vez al abrir la pantalla

  // 4. Función para mandar los datos del evento al Backend
  const manejarCrearEvento = async (e) => {
    e.preventDefault();

    // Juntamos los IDs seleccionados (Ej: "1,2")
    const idsUnidos = [responsable1, responsable2, responsable3].filter(Boolean).join(',');

    const nuevoEvento = {
      nombre: nombre,
      fecha: fecha,
      idUsuario: idsUnidos, 
      descripcion: descripcion
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
        alert('¡Evento creado exitosamente con sus responsables reales!');
        navigate('/general');
      } else {
        alert('Error al intentar crear el evento.');
      }
    } catch (error) {
      console.error('Error:', error);
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
            
            <div className="grupo-input">
              <input 
                type="text" 
                placeholder="Nombre del evento..." 
                className="campo-redondo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required 
              />
            </div>

            <div className="grupo-input">
              <input 
                type="date" 
                className="campo-redondo selector-interno"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required 
              />
            </div>

            <div className="grupo-input">
              <textarea 
                placeholder="Descripción..." 
                className="campo-redondo area-texto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            {/* Selector 1: Responsable Principal */}
            <div className="grupo-input">
              <p className="etiqueta-formulario">Anfitrion 1 (Obligatorio)</p>
              <select 
                className="campo-redondo selector-interno"
                value={responsable1}
                onChange={(e) => setResponsable1(e.target.value)}
                required
              >
                <option value="">Selecciona el anfitrion...</option>
                {/* 👇 CAMBIO CLAVE: Recorremos la lista de la BD para pintar las opciones de forma real */}
                {usuariosBD.map((usuario) => (
                  <option key={`resp1-${usuario.id}`} value={usuario.id}>
                    {usuario.nombre} ({usuario.rol})
                  </option>
                ))}
              </select>
            </div>

            {/* Selector 2: Segundo Responsable */}
            <div className="grupo-input">
              <p className="etiqueta-formulario">Anfitrion 2 (Opcional)</p>
              <select 
                className="campo-redondo selector-interno"
                value={responsable2}
                onChange={(e) => setResponsable2(e.target.value)}
              >
                <option value="">Selecciona el anfitrion...</option>
                {/* Volvemos a recorrer la lista real para el segundo selector */}
                {usuariosBD.map((usuario) => (
                  <option key={`resp2-${usuario.id}`} value={usuario.id}>
                    {usuario.nombre} ({usuario.rol})
                  </option>
                ))}
              </select>
            </div>

            {/* Selector 3: Tercer Responsable */}
            <div className="grupo-input">
              <p className="etiqueta-formulario">Anfitrion 3(Opcional)</p>
              <select 
                className="campo-redondo selector-interno"
                value={responsable3}
                onChange={(e) => setResponsable3(e.target.value)}
              >
                <option value="">Selecciona el anfitrion...</option>
                {/* Volvemos a recorrer la lista real para el tercer selector */}
                {usuariosBD.map((usuario) => (
                  <option key={`resp3-${usuario.id}`} value={usuario.id}>
                    {usuario.nombre} ({usuario.rol})
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="boton-crear-blanco">
              Crear
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}