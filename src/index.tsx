import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { TabBar } from './TabBar'
import { OldTestament } from './OldTestament'
import { NewTestament } from './NewTestament'
import { BD2011 } from './BD2011'

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <div className="Tab">
        <RouterProvider
          router={createBrowserRouter([
            { path: '/', element: <BD2011 /> },
            { path: '/cuu-uoc', element: <OldTestament /> },
            { path: '/tan-uoc', element: <NewTestament /> },
          ])}
        />
      </div>
      <TabBar />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
