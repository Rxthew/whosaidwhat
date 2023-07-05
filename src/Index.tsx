import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Blog from './Blog'
import Main from './Main'
import Login from './Login'
import User from './User'
import Signup from './Signup'
import Post from './Post'


const blogRouter = createBrowserRouter([{
  path: '/',
  element: <Blog />,
  children: [
    {
      index: true,
      element: <Main />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/post/*',
      element: <Post /> //useContext probably or localstorage
    },
    {
      path: '/user/*',
      element: <User /> //same as above.
    }

  ]
}])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={blogRouter}/>
  </React.StrictMode>,
)
