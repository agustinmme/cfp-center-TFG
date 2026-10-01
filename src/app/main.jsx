import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProviders } from './providers/AppProviders.jsx'
import '../styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('The application root element is missing.')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
