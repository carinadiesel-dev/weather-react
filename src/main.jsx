import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LocationContextProvider } from './context/LocationContext.tsx'
import { WeatherContextProvider } from './context/WeatherContext.tsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </React.StrictMode>,
)
