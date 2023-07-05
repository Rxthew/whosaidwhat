import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Header from './Header.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header username="lover"/>
    <App />
  </React.StrictMode>,
)
