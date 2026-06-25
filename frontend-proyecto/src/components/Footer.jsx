// src/components/Footer.jsx

/**
 * Componente que renderiza el pie de página de la aplicación.
 * Muestra el branding institucional del software junto con los logotipos
 * del proyecto y de la entidad SENA.
 * 
 * @component
 * @returns {React.JSX.Element} Barra inferior con logotipos y créditos.
 */
export default function Footer() {
  return (
    <div className="barra-inferior">
      <div className="footer-izquierdo">
        <img src="/Logo_MDM.png" alt="Logo Manager de Ministerios" className="icono-footer" />
        <span className="texto-footer">Manager de Ministerios</span>
      </div>
      <div className="footer-derecho">
        <img src="/logoSena.png" alt="Logo de la institución SENA" className="icono-footer" />
      </div>
    </div>
  );
}