import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import NotFound from '../pages/notFound'
import Dashboard from '../pages/admin/dashboard'
import Employees from '../pages/admin/employees'
import Customers from '../pages/admin/customers'

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
            <Route path='/user/employees' element={<Employees />} />
            <Route path='/user/customers' element={<Customers />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing