import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './contexts/UserContext'
import { HaulProvider } from './contexts/HaulContext'
import routes from './routes'
import './index.css'

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <HaulProvider>
        <RouterProvider router={router} />
      </HaulProvider>
    </UserProvider>
  </StrictMode>,
)
