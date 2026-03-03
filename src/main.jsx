import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Header2 from './Header2.jsx'
import Third from './Third.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Header2 />
    <Third />
  </StrictMode>,
)
