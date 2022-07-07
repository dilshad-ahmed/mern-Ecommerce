import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios';
import { createOrder } from '../../features/cart/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';


const PaymentProcess = () => {

  const {shippingInfo , cartItems} = useSelector((state) => state.cart)
  const {error} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.login)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const elements = useElements();
  const stripe =  useStripe()

  const payBtn = useRef(null)

  const paymentData = {
    amount : Math.round(orderInfo.totalPrice * 100)
  }

  

  const order = {
    shippingInfo,
    orderItems : cartItems,
    itemsPrice : orderInfo.subtotal,
    taxPrice : orderInfo.tax,
    shippingPrice : orderInfo.shippingCharge,
    totalPrice : orderInfo.totalPrice
  }


  const submitHandler = async(e) => {
    e.preventDefault()
    payBtn.current.disabled = true;

    try {
      const config = {
        headers : {
          "Content-Type" : "application/json"
        },
        withCredentials : true
      };

      const {data} = await axios.post("/api/v1/payment/process", paymentData, config)

      const client_secret = data.clientSecret;

      if(!elements || !stripe) return;

      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method : {
          card : elements.getElement(CardNumberElement),
          billing_details : {
            name : user.name, 
            email : user.email,
            address : {
              line1 : shippingInfo.address,
              city : shippingInfo.city,
              state : shippingInfo.state,
              postal_code : shippingInfo.pinCode,
              country : shippingInfo.country
            }
          }
        }
      });

      if(result.error){
        payBtn.current.disabled = false;
      
      } else {
        if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id : result.paymentIntent.id,
              status : result.paymentIntent.status,
            }

            dispatch(createOrder({order}))

            localStorage.removeItem("cartItems");
            dispatch(clearCart);
            navigate("/success")

        }else{
          alert("some issue occurs during payment")
        }
      } 


    }
    catch (error) {
      payBtn.current.disabled = false ;
    }

  }

  useEffect(() => {

  
    
  }, [dispatch, error])
  

  return (
    <>
      <div className="container vh-100 d-flex flex-column justify-content-center ">
        <h4 className='text-center mb-4'>payment process</h4>
        <div className="row">
          <div className='col-md-4 col-sm-2'></div>
          <div className='col-md-4 col-sm-8  '>
            <form onSubmit={(e) => submitHandler(e)}>
              <div className="paymentForm">
                <div>
                  <CardNumberElement className='form-control mb-2 py-2'/>
                </div>
                <div>
                  <CardExpiryElement className='form-control mb-2 py-2'/>
                </div>
                <div>
                  <CardCvcElement className='form-control mb-2 py-2'/>
                </div> 
                <input type="submit" ref={payBtn} value="Pay" className='btn btn-primary d-block w-100'/>  
              </div>
            </form>
          </div>
          <div className='col-md-4 col-sm-2'></div>
        </div>
      </div>
    </>
  )
}

export default PaymentProcess