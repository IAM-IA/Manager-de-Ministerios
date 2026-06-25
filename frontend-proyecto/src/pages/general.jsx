import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/general.css';

/**
 * Componente que renderiza la vista general de la aplicación.
 * Muestra un calendario dinámico basado en la fecha del sistema actual
 * y despliega una sección lateral con el listado de eventos programados.
 * 
 * @component
 * @returns {React.JSX.Element} Panel principal con calendario y eventos.
 */
export default function General() {
  const [eventos] = useState([
    { id: 1, dia: 9, detalle: "Servicio de Anfitrión" },
    { id: 2, dia: 17, detalle: "Reunión de Anfitriones" }
  ]);

  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const anioActual = fechaActual.getFullYear();
  const numeroMes = fechaActual.getMonth();

  const mesesEspanol = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const nombreMesActual = `${mesesEspanol[numeroMes]} ${anioActual}`;
  
  /**
   * Determina la cantidad total de días del mes en curso utilizando
   * el desbordamiento de días del objeto Date (pasando 0 al mes siguiente).
   */
  const totalDiasMes = new Date(anioActual, numeroMes + 1, 0).getDate();

  /**
   * Ajusta el índice del primer día de la semana para que comience en Lunes (1)
   * en lugar del estándar dominical de JavaScript (0).
   */
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
      
      <Navbar />

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

    </div>
  );
}