import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProviders } from './providers/AppProviders.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Falta el elemento raiz de la aplicacion.')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
