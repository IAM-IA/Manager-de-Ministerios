import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/general.css';

export default function General() {
  // Simulación de eventos próximos
  const [eventos] = useState([
    { id: 1, dia: 9, detalle: "Servicio de Anfitrión" },
    { id: 2, dia: 17, detalle: "Reunión de Anfitriones" }
  ]);

  // --- LÓGICA NATIVA DE JAVASCRIPT PARA EL CALENDARIO ---
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const anioActual = fechaActual.getFullYear();
  const numeroMes = fechaActual.getMonth();

  const mesesEspanol = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const nombreMesActual = `${mesesEspanol[numeroMes]} ${anioActual}`;
  const totalDiasMes = new Date(anioActual, numeroMes + 1, 0).getDate();

  let primerDiaSemana = new Date(anioActual, numeroMes, 1).getDay();
  if (primerDiaSemana === 0) primerDiaSemana = 7;

  const casillasVacias = [];
  for (let i = 1; i < primerDiaSemana; i++) {
    casillasVacias.push(i);
  }

  const diasDelMes = [];
  for (let dia = 1; dia <= totalDiasMes; dia++) {
    diasDelMes.push(dia);
  }

  return (
    <div className="interfaz-escritorio">
      
      {/* Tu nueva barra lateral independiente */}
      <Navbar />

      {/* Área central del contenido */}
      <div className="contenido-principal">
        <header className="cabecera-modulo">
          <h1 className="titulo-principal">{nombreMesActual}</h1>
        </header>

        <div className="distribucion-columnas">
          <main className="bloque-calendario">
            <div className="grilla-dias">
              {casillasVacias.map((_, index) => (
                <div key={`vacio-${index}`} className="dia-tarjeta vacio"></div>
              ))}
              {diasDelMes.map((dia) => {
                const esHoy = dia === diaActual ? " hoy" : "";
                return (
                  <div key={`dia-${dia}`} className={`dia-tarjeta${esHoy}`}>
                    {dia}
                  </div>
                );
              })}
            </div>
          </main>

          <section className="contenedor-eventos">
            <h2 className="subtitulo-eventos">Eventos próximos</h2>
            <div className="lista-eventos">
              {eventos.map((evento) => (
                <div key={evento.id} className="tarjeta-evento">
                  <div className="dia-evento">{evento.dia}</div>
                  <div className="detalle-evento">{evento.detalle}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Aquí ya no está la etiqueta Footer, por lo que no cargará nada más */}
    </div>
  );
}