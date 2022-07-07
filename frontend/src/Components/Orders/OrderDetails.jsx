import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { getOrderDetails } from '../../features/cart/orderDetailsSlice'

const OrderDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const{ loading, error, order} = useSelector((state) => state.orderDetails)
        
    useEffect(() => {

        dispatch(getOrderDetails({id}));

    }, [dispatch, id, error])

  return (
    <>
        <div className='container mt-4'>
          <div className="row">
          <div className="col-md-8">
                    {/* sipping info */}
                    <div className='shadow-sm p-2'>
                        <h4 className='border-bottom d-inline-block pb-2 mb-3'> Shipping Info</h4>
                        <p><span className='fw-bold px-1'> Product Id:</span> {order && order._id}</p>
                        <div className="shipping-info">
                            <p> <span className='fw-bold px-1'> Name :</span>{order.user && order.user.name} </p>
                            <p> <span className='fw-bold px-1'> Phone :</span>{order.shippingInfo && order.shippingInfo.phoneNo} </p>
                            <p> <span className='fw-bold px-1'> Address :</span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city},${ order.shippingInfo.city} , ${ order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${ order.shippingInfo.country}`} </p>
                        </div>    
                    </div>   
                    {/* payment status */}
                    <div className='shadow-sm p-2 mt-3'>
                        <h4 className='border-bottom d-inline-block pb-2 mb-3'> Payment Status</h4>
                        <div className="shipping-info">
                            <p> <span className='fw-bold px-1'> status :</span>{order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID" } </p>
                            <p> <span className='fw-bold px-1'> Amount :</span>{order.totalPrice && order.totalPrice} </p>
                        </div>    
                    </div>   
                    {/* Order status */}
                    <div className='shadow-sm p-2 mt-3'>
                        <h4 className='border-bottom d-inline-block pb-2 mb-3'> Order Status</h4>
                        <div className="shipping-info">
                            <p> <span className='fw-bold px-1'> Status :</span>{order.orderStatus && order.orderStatus} </p>
                        </div>    
                    </div>   
                    {/* Cart items */}
                    <div className='mt-5'>
                        <h4 className='border-bottom d-inline-block pb-2 mb-3'> Your cart Items</h4>
                        {
                            order.orderItems && order.orderItems.map( (item ,i) => (
                                <div key={i} className="cart-item shadow-sm p-2 mb-3 align-items-center cart-item d-flex justify-content-between p-2 shadow-sm">
                                    <img src={item.image} alt="" className='img-fluid' width="100" />
                                    <p> { item.name } </p>
                                    <p> {item.price} x {item.quantity} = {item.price * item.quantity} </p>
                                </div>
                            ))
                        }
                    </div>

                </div>
          </div>
        </div>
    </>


  )
}

export default OrderDetails