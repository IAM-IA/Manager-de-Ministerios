import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

/**
 * Punto de entrada principal de la aplicación.
 * Se encarga de capturar el nodo contenedor del DOM de HTML e inicializar
 * el árbol de componentes de React bajo el modo estricto (StrictMode).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)