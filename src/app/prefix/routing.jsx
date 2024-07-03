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
import Users from '../pages/admin/users'
import Settings from '../pages/admin/settings'
import EmployeeForm from '../pages/forms/employee/employeeForm'
import EmployeeEdit from '../pages/forms/employee/employeeEdit'
import AddSuplier from '../pages/forms/suplier/addSuplier'
import CustomerForm from '../pages/forms/customer/customerForm'
import AddProduct from '../pages/forms/inventory/addProduct'
import AddUser from '../pages/forms/users/addUser'
import PaymentsForm from '../pages/forms/payment/paymentsForm'
import CustomerEditForm from '../pages/forms/customer/customerEditForm'
import EditProduct from '../pages/forms/inventory/editProduct'
import EditSuplier from '../pages/forms/suplier/editSuplier'
import EditUser from '../pages/forms/users/editUser'
import EditPayments from '../pages/forms/payment/editPayments'
import Grn from '../pages/admin/grn'

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
            <Route path='/user/grn' element={<Grn />}/>
            <Route path='/user/users' element={<Users />} />
            <Route path='/user/settings' element={<Settings />} />

            <Route path='/user/employees/add' element={<EmployeeForm />} />
            <Route path='/user/employees/edit/:id' element={<EmployeeEdit/>} />

            <Route path='/user/supliers/add' element={<AddSuplier />} />
            <Route path='/user/supliers/edit/:id' element={<EditSuplier />} />

            <Route path='/user/customers/add' element={<CustomerForm />} />
            <Route path='/user/customers/edit/:id' element={<CustomerEditForm />}/>

            <Route path='/user/inventory/add' element={<AddProduct />}/>
            <Route path='/user/inventory/edit/:id' element={<EditProduct />} />

            <Route path='/user/users/add' element={<AddUser />} />
            <Route path='/user/users/edit/:id' element={<EditUser />} />

            <Route path='/user/payments/add' element={<PaymentsForm />}/>
            <Route path='/user/payments/edit/:id' element={<EditPayments />} />



        </Routes>
    </BrowserRouter>
  )
}

export default Routing