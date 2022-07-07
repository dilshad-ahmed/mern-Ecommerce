import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const ConfirmOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.login)

    const subtotal = cartItems.reduce((acc, item) =>
        acc + item.price * item.quantity, 0
    )

    const shippingCharge = subtotal > 1000 ? 0 : 40;
    const tax = subtotal * 0.14
    const totalPrice = subtotal + shippingCharge + tax;

    const paymentHandle = () => {
        const data = {
            subtotal,
            shippingCharge,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/process/payment')

    }

    return (
        <>
            <div className="container mt-4">
                <div className="row gy-4">
                    <div className="col-md-8">
                        {/* sipping info */}
                        <div className='shadow-sm p-2'>
                            <h4 className='border-bottom d-inline-block pb-2 mb-3'> Shipping Info</h4>
                            <div className="shipping-info">
                                <p> <span className='fw-bold px-1'> Name :</span>{user && user.name} </p>
                                <p> <span className='fw-bold px-1'> Phone :</span>{shippingInfo && shippingInfo.phoneNo} </p>
                                <p> <span className='fw-bold px-1'> Address :</span>{shippingInfo && `${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.city} , ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`} </p>
                            </div>
                        </div>
                        {/* Cart items */}
                        <div className='mt-5'>
                            <h4 className='border-bottom d-inline-block pb-2 mb-3'> Your cart Items</h4>
                            {
                                cartItems && cartItems.map((item, i) => (
                                    <div key={i} className="cart-item shadow-sm p-2 mb-3 align-items-center cart-item d-flex justify-content-between p-2 shadow-sm">
                                        <img src={item.image} alt="" className='img-fluid' width="100" />
                                        <p> {item.name} </p>
                                        <p> {item.price} x {item.quantity} = {item.price * item.quantity} </p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className="col-md-4 ">
                        <div className="order-summary shadow-sm border p-4">
                            <h4 className='pb-3 text-center'> Order Summary</h4>
                            <div className='d-flex justify-content-between'>
                                <p> subtotal : </p>
                                <p> &#8377; {subtotal} </p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p> shipping Charges :</p>
                                <p> &#8377; {shippingCharge} </p>
                            </div>
                            <div className='d-flex justify-content-between border-bottom'>
                                <p> tax :</p>
                                <p> &#8377;{Math.floor(tax)} </p>
                            </div>
                            <div className='d-flex justify-content-between pt-4  '>
                                <h4> Total :</h4>
                                <h4> &#8377;{totalPrice} </h4>
                            </div>
                        </div>
                    </div>

                    <button onClick={paymentHandle} className='btn btn-primary'> Proceed to Payment </button>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder