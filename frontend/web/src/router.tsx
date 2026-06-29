import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
])
