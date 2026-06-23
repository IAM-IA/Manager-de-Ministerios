// src/components/Footer.jsx
export default function Footer() {
  return (
    <div className="barra-inferior">
      <div className="footer-izquierdo">
        {/* Las imágenes deben estar en la carpeta public/img/ */}
        <img src="/Logo_MDM.png" alt="Logo Manager de Ministerios" className="icono-footer" />
        <span className="texto-footer">Manager de Ministerios</span>
      </div>
      <div className="footer-derecho">
        <img src="/logoSena.png" alt="Logo de la institución SENA" className="icono-footer" />
      </div>
    </div>
  );
}