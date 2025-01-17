import { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <Fragment>
    <App>
      <RouterProvider router={router} />
    </App>
  </Fragment>,
)
