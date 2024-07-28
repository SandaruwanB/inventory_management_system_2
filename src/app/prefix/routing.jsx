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
import Orders from '../pages/admin/customerOrders'
import AddInvoicing from '../pages/forms/invoicing/addInvoicing'
import EditInvoicing from '../pages/forms/invoicing/editInvoicing'
import AddOrder from '../pages/forms/order/addSuplierOrder'
import AddGrn from '../pages/forms/grn/addGrn'
import EditGrn from '../pages/forms/grn/editGrn'
import EditOrder from '../pages/forms/order/editCustomerOrder'
import SuplierPayments from '../pages/admin/suplierPayments'
import SuplierOrders from '../pages/admin/suplierOrders'
import AddCustomerOrder from '../pages/forms/order/addCustomerOrder'
import EditSuplierOrder from '../pages/forms/order/editSuplierOrder'
import SuplierPaymentForm from '../pages/forms/payment/suplierPaymentForm'
import EditSuplierPayment from '../pages/forms/payment/editSuplierPayment'
import InventoryComponents from '../pages/admin/inventoryXomponents'
import SalesReport from '../pages/admin/salesReport'

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
            <Route path='/user/customer/payments' element={<Payments />} />
            <Route path='/user/suplier/payments' element={<SuplierPayments />} />
            <Route path='/user/grn' element={<Grn />}/>
            <Route path='/user/inventory/details' element={<InventoryComponents />} />
            <Route path='/user/customer/orders' element={<Orders />} />
            <Route path='/user/suplier/orders' element={<SuplierOrders />} />
            <Route path='/user/users' element={<Users />} />
            <Route path='/user/settings' element={<Settings />} />
            <Route path='/user/reports/sales' element={<SalesReport />} />

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

            <Route path='/user/customer/payments/add' element={<PaymentsForm />}/>
            <Route path='/user/customer/payments/edit/:id' element={<EditPayments />} />
            <Route path='/user/suplier/payments/add' element={<SuplierPaymentForm />} />
            <Route path='/user/suplier/payments/edit/:id' element={<EditSuplierPayment />} />

            <Route path='/user/invoicing/add' element={<AddInvoicing />}/>
            <Route path='/user/invoicing/edit/:id' element={<EditInvoicing />} />

            <Route path='/user/suplier/orders/add' element={<AddOrder />} />
            <Route path='/user/customer/orders/add' element={<AddCustomerOrder />} />
            <Route path='/user/customer/orders/edit/:id' element={<EditOrder />} />
            <Route path='/user/suplier/orders/edit/:id' element={<EditSuplierOrder />} />

            <Route path='/user/grn/add' element={<AddGrn />} />
            <Route path='/user/grn/edit/:id' element={<EditGrn />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing