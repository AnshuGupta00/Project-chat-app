import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Features from './pages/Features.jsx'
import Privacy from './pages/Privacy.jsx'
import Downloads from './pages/Downloads.jsx'
import Signup from './pages/Signup.jsx'
import UsersList from './components/Chat/userlist.jsx'
import Chat from './components/Chat/Chat.jsx'
import ChatPage from './pages/Chatpage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// configure router with home and login routes
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/Features', element: <Features /> },
  { path: '/Privacy', element: <Privacy /> },
  { path: '/Download', element: <Downloads /> },
  { path: '/Signup', element: <Signup /> },
  { path: '/userlist', element: <UsersList /> },
  { path: '/chat', element: <Chat /> },
  { path: '/chatpage', element: <ChatPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />
  </StrictMode>,
)
