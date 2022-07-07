import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import userImg from "../../Images/user-img.png"
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/user/loginSlice'
// import { clearCart } from '../../features/cart/cartSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar = () => {

  const [keyword, setKeyword] = useState('')
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [avtar, setAvtar] = useState(userImg)
  const { loading, user, isAuthenticated } = useSelector((state) => state.login)
  const { cartItems } = useSelector((state) => state.cart)

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      // kwd.replace(/^\s+|\s+$/gm,'');
      // kwd = kwd.replaceAll("\u00A0", "");

      let kwd = keyword;
      console.log("kwd before replce", kwd)
      kwd = kwd.trim();
      console.log("kwd after replce", kwd)
      navigate(`/products/${kwd}`) && setKeyword('');
    }
  }

  const logoutHandle = () => {
    dispatch(logoutUser());

    // dispatch(clearCart());

  }

  useEffect(() => {
    if (isAuthenticated && user) {
      setAvtar(user.avtar.url)
    } else (
      setAvtar(userImg)
    )
  }, [dispatch, user, isAuthenticated, cartItems])

  return (
    <>
      {/* navbar desktop start */}
      <ToastContainer />
      <nav className=" navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="container-md">
          <Link to="/" className="navbar-brand fs-4" >
            Ecommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto me-4">

              <li className="nav-item ms-2" title="All Product List">
                <NavLink to="/products" className="nav-link" activeclassname="active">
                  products
                </NavLink>
              </li>

              <li className="nav-item ms-2 dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">User
                  {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    { cartItems&&cartItems.length}
                    <span className="visually-hidden">unread messages</span>
                  </span> */}
                </a>
                <ul className="dropdown-menu">
                  {/* <li><a className="" href="#">Registration</a></li> */}
                  <li >
                    {isAuthenticated && user && user.userRole === 'admin' ? (
                      <Link to="/admin/dashboard" className="dropdown-item" >
                        Go to Dashboard
                      </Link>
                    ) : (null)}

                    {!isAuthenticated ? (
                      <>
                        <Link to="/login" className="dropdown-item" >
                          Login
                        </Link>
                        <Link to="/cart" className="dropdown-item"> Cart  <span className="badge bg-danger ps-2"> {cartItems && cartItems.length} </span> </Link>
                        <Link to="/Register" className="dropdown-item" >
                          Create Account
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/cart" className="dropdown-item">  Cart  <span className="badge bg-danger ps-2"> {cartItems && cartItems.length} </span> </Link>
                        <Link to="/orders" className="dropdown-item">All Orders  </Link>
                        <Link to="/account" className="dropdown-item" >
                          Edit Profile
                        </Link>
                        <button onClick={logoutHandle} className="dropdown-item" >
                          Logout
                        </button>
                      </>
                    )}

                  </li>
                </ul>
              </li>
              <li className='ps-2'>
                <Link to="/account">
                  <img src={avtar} alt="user" className='rounded-pill ' style={{ width: "40px" }} />
                </Link>
              </li>
            </ul>

            <form className="d-flex" onSubmit={searchSubmitHandler}>
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" title="search products">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {/* navbar desktop start */}
    </>
  )
}

export default Navbar