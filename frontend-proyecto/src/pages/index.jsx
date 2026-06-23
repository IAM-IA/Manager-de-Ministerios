import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Importamos el Footer para esta vista

export default function Inicio() {
  return (
    <div className="vista-bienvenida">
      {/* Encabezado principal */}
      <div className="titulo-bienvenida">
        ¡BIENVENIDO!
      </div>

      {/* Contenedor de presentación y accesos */}
      <div className="caja-principal">
        
        {/* CORREGIDO: Cambiado 'class' por 'className' */}
        <p className="texto-descripcion">
          <strong>Manager De Ministerios</strong> es un software para creación de eventos, 
          donde podrás programar eventos de tu iglesia junto con los siervos encargados. 
          Y lo mejor...
        </p>

        <p className="texto-llamativo">
          ¡Todos los participantes lo sabrán!
        </p>

        {/* Bloque de navegación optimizado con React Router */}
        <div className="contenedor-botones">
          <div className="boton-reg_in">
            <span>Si es tu primera vez</span>
            <Link to="/registro" className="boton">Registrate</Link>
          </div>
          <div className="boton-reg_in">
            <span>¿Ya habías estado antes?</span>
            <Link to="/login" className="boton">Inicia Sesión</Link>
          </div>
        </div>

      </div>

      {/* Acoplamos el Footer al final del flujo vertical de la pantalla de bienvenida */}
      <Footer />
    </div>
  );
}