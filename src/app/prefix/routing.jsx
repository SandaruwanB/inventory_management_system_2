import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import NotFound from '../pages/notFound'
import Dashboard from '../pages/admin/dashboard'

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Default roues */}
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />

            {/* auth routes */}
            <Route path='/user/dashboard' element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing