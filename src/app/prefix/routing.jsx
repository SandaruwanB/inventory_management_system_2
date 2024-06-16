import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import NotFound from '../pages/notFound'
import Dashboard from '../pages/admin/dashboard'
import Employees from '../pages/admin/employees'
import Customers from '../pages/admin/customers'
import Supliers from '../pages/admin/supliers'
import Inventory from '../pages/admin/inventory'
import Invoicing from '../pages/admin/invoicing'
import Payments from '../pages/admin/payments'

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
            <Route path='/user/supliers' element={<Supliers />} />
            <Route path='/user/inventory' element={<Inventory />} />
            <Route path='/user/invoicing' element={<Invoicing />} />
            <Route path='/user/payments' element={<Payments />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing