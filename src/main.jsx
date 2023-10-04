import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './templates/MainLayout'
import { DataStoreProvider } from './context/DataStoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataStoreProvider>
        <Routes>
          <Route element={ <MainLayout /> }>
            <Route path='/' element={ <Home /> }/>
          </Route>
        </Routes>
      </DataStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)
