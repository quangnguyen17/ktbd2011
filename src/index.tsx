import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  useLocation,
  RouterProvider,
  Navigate,
  Outlet,
  Link,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { Read } from './Read'
import { About } from './About'

const queryClient = new QueryClient()

export const TabBar = () => {
  const { pathname } = useLocation()

  return (
    <div className="TabBar">
      <Link className={pathname === '/read' ? 'active' : ''} to="/read">
        ĐỌC
      </Link>
      <Link className={pathname === '/about' ? 'active' : ''} to="/about">
        GIỚI THIỆU
      </Link>
    </div>
  )
}

const Layout: React.FC = () => {
  return (
    <div className="App">
      <div className="Tab">
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to="/read" replace /> },
      { path: '/read', element: <Read /> },
      { path: '/about', element: <About /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </QueryClientProvider>
  </React.StrictMode>
)
