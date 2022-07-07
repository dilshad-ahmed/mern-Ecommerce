import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './Components/Layout';
import Product from './Components/Product/Product';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { loadUser } from './features/user/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './Components/Profile/Profile';
import Dashboard from './Components/Admin/Dashboard';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import UpdatePassword from './Components/UpdateUser/UpdatePassword';
import ForgotPasswordView from './Components/UpdateUser/ForgotPasswordView';
import ResetPasswordView from './Components/UpdateUser/ResetPasswordView';
import CartView from './Components/Cart/CartView'
import ShippingView from './Components/Shipping/ShippingView';
import ConfirmOrder from './Components/Shipping/ConfirmOrder';
import PaymentProcess from './Components/Shipping/PaymentProcess';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SuccessView from './Components/Shipping/SuccessView';
import MyOrders from './Components/Orders/MyOrders';
import OrderDetails from './Components/Orders/OrderDetails';
import ProductsAdmin from './Components/Admin/Products/ProductsAdmin';
import Orders from './Components/Admin/Orders/Orders';
import Users from './Components/Admin/Users/Users';
import Reviews from './Components/Admin/Reviews/Reviews';
import CreateProduct from './Components/Admin/Products/CreateProduct';
import UpdateProduct from './Components/Admin/Products/UpdateProduct';
import UpdateOrder from './Components/Admin/Orders/UpdateOrder';
import UpdateUserAdmin from './Components/Admin/Users/UpdateUserAdmin';
import { toast } from 'react-toastify'


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.login)

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);

  }

  useEffect(() => {

    dispatch(loadUser())


    console.log("load user effect ===>")

    getStripeApiKey();
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/account" element={isAuthenticated === false ? <Navigate to="/login" replace /> : <Profile />} />
          <Route path="/login/shipping" element={isAuthenticated === false ? <Navigate to="/" replace /> : <ShippingView />} />
          <Route path="/order/confirm" element={isAuthenticated === false ? <Navigate to="/" replace /> : <ConfirmOrder />} />
          <Route path="/me/update" element={isAuthenticated === false ? <Navigate to="/login" replace /> : <UpdateUser />} />
          <Route path="/password/update" element={isAuthenticated === false ? <Navigate to="/" replace /> : <UpdatePassword />} />
          <Route path="/forgot/password" element={<ForgotPasswordView />} />
          <Route path="/password/token/:token" element={<ResetPasswordView />} />
          <Route path="/admin/dashboard" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <Dashboard />} />
          <Route path="/admin/products" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <ProductsAdmin />} />
          <Route path="/admin/product" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <CreateProduct />} />
          <Route path="/admin/product/:id" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <UpdateProduct />} />
          <Route path="/admin/order/:id" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <UpdateOrder />} />
          <Route path="/admin/orders" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <Orders />} />
          <Route path="/admin/users" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <Users />} />
          <Route path="/admin/user/:id" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <UpdateUserAdmin />} />
          <Route path="/admin/reviews" element={isAuthenticated === false && user && user.userRole !== "admin" ? <Navigate to="/" replace /> : <Reviews />} />

          {
            setStripeApiKey &&
            <Route path="/process/payment/*" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Routes>
                  <Route index element={isAuthenticated === false ? <Navigate to="/" replace /> : <PaymentProcess />} />
                </Routes>
              </Elements>
            } />

          }

          <Route path="/success" element={isAuthenticated === false ? <Navigate to="/" replace /> : <SuccessView />} />
          <Route path="/orders" element={isAuthenticated === false ? <Navigate to="/" replace /> : <MyOrders />} />
          <Route path="/order/:id" element={isAuthenticated === false ? <Navigate to="/" replace /> : <OrderDetails />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
