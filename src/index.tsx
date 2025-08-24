import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { TabBar } from './TabBar'
import { OldTestament } from './OldTestament'
import { NewTestament } from './NewTestament'
import { Home } from './Home'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/cuu-uoc', element: <OldTestament /> },
  { path: '/tan-uoc', element: <NewTestament /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="App">
      <div className="Tab">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
      <TabBar />
    </div>
  </React.StrictMode>
)
