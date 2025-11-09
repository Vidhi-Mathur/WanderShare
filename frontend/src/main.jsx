import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { AuthCtxProvider } from './store/Auth-Context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthCtxProvider>
        <App />
    </AuthCtxProvider>
  </StrictMode>,
)
