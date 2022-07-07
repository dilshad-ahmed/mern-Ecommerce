import React, {useEffect} from 'react'
import CartItemCard from './CartItemCard'
import { useSelector , useDispatch } from 'react-redux'
import cartEmptyImg from '../../Images/cart-empty.png'
import {Link, useNavigate} from 'react-router-dom'

const CartView = () => {
    
    const cartItems = useSelector((state) => state.cart.cartItems)
    const{isAuthenticated } = useSelector((state) => state.login)

    const navigate = useNavigate()

    const checkourHandler = () => {
        navigate('/login?redirect=shipping')
    }

    

  return (
    <> { cartItems.length > 0 ? 
    (
        <div className="container-md px-sm-4 my-2">
            <div className="row text-center bg-secondary font-monospace fw-bold p-2 row text-white">
                <div className="col-6"> 
                    <div className="p"> Product </div>
                </div>
                <div className="col-3"> 
                    <div className="p"> Quantity </div>
                </div>
                <div className="col-3"> 
                    <div className="p"> Subtotal </div>
                </div>
            </div>

            <div className=''>
                <CartItemCard />
            </div>

            <div className="gross-total p-3 mt-3">
                <div className="row">
                    <div className="col-md-4 offset-md-7">
                        <hr />
                        <div className='d-flex justify-content-between '>
                            <h4> Gross total </h4>
                            <h3> &#8377; { cartItems.reduce( (acc, item) => acc + item.quantity * item.price , 0)}   </h3>
                        </div>
                        <div className='d-flex justify-content-end mt-3'>
                            <button onClick={checkourHandler} className='btn btn-primary rounded-pill'> Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ): (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div>
                <Link to="/products">
                    <img src={cartEmptyImg} alt="cartEmptyImg" className='img-fluid mx-auto' />
                </Link>
            </div>
        </div>
    )
    }
       
    </>
  )
}

export default CartView