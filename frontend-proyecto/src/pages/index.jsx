import { Link } from "react-router-dom";
import "../css/index.css";
import Footer from "../components/Footer"; 

/**
 * Componente que renderiza la página de inicio y bienvenida de la aplicación.
 * Proporciona la descripción principal del sistema y los accesos directos por
 * enrutamiento hacia los módulos de registro e inicio de sesión.
 * 
 * @component
 * @returns {React.JSX.Element} Pantalla de bienvenida con controles de acceso.
 */
export default function Inicio() {
  return (
    <div className="background-img">
      <div className="vista-bienvenida">
        <div className="titulo-bienvenida">¡BIENVENIDO!</div>

        <div className="caja-principal">
          <p className="texto-descripcion">
            <strong>Manager De Ministerios</strong> es un software para creación
            de eventos, donde podrás programar eventos de tu iglesia junto con
            los siervos encargados. Y lo mejor...
          </p>

          <p className="texto-llamativo">¡Todos los participantes lo sabrán!</p>

          <div className="contenedor-botones">
            <div className="boton-reg_in">
              <span>Si es tu primera vez</span>
              <Link to="/registro" className="boton">
                Registrate
              </Link>
            </div>
            <div className="boton-reg_in">
              <span>¿Ya habías estado antes?</span>
              <Link to="/login" className="boton">
                Inicia Sesión
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}