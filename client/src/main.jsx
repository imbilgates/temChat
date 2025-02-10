import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './contex/SocketContex.jsx'

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
  </SocketProvider>,
)
