import React from 'react'
import "./Style/Xmn.css"
import { useRoutes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Catepts from './Components/Catepts'
import Privacypolicy from './Components/Privacypolicy'
import Posts from './Components/Posts'
import Xocpdb from './Components/Xocp/Xocpdb'
import { DataProvider } from './Context'
export default function Main() {
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/About", element: <About /> },
    { path: "/Contact", element: <Contact /> },
    { path: "/Privacypolicy", element: <Privacypolicy /> },
    { path: "/Cate/:name", element: <Catepts /> },
    { path: '/Posts/:Cate/:id', element: <Posts /> },
    { path: '/Xocp/krisnil/mn/cp', element: <Xocpdb /> },

  ])
  return (
    <div className='Xmn'>
      <DataProvider>
        {element}
      </DataProvider>
    </div>
  )
}
