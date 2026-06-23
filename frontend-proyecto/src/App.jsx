// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/index';
import Registro from './pages/registro';
import InicioSesion from './pages/inicio_sesion';
import PanelPrincipal from './pages/general';
import CrearEvento from './pages/crear_evento';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/general" element={<PanelPrincipal />} />
        <Route path="/crear_evento" element={<CrearEvento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;