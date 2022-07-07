import React from 'react'
import { Outlet, NavLink, Link } from "react-router-dom";
import FooterView from './Footer/FooterView';
import Navbar from './Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar/>
        <Outlet/>
      <FooterView/>
    </>
  )
}

export default Layout