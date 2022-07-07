import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails } from '../../../features/cart/orderDetailsSlice';
import { updateOrderAdmin, updateOrderReset, resetError } from '../../../features/orderAdmin/updateOrderSlice';
import { toast } from 'react-toastify'

const UpdateOrder = () => {
    const [fullView, setFullView] = useState(false)
    const [status, setStatus] = useState("")

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, order } = useSelector((state) => state.orderDetails)

    const { error: updateError, isUpdated } = useSelector((state) => state.updateOrder)

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status)

        dispatch(updateOrderAdmin({ id: id, productData: myForm }))


    }

    useEffect(() => {
        if (updateError) {
            toast.error(updateError);
            dispatch(resetError());
        }
        if (isUpdated) {
            alert("updated successfully");
            dispatch(updateOrderReset())
            navigate("/admin/orders")
        }

        dispatch(getOrderDetails({ id }));

    }, [dispatch, id, error, isUpdated])

    return (
        <>
            <div className="container-fluid ">
                <div className='row'>
                    <div className={fullView ? 'd-none' : 'col-lg-2 col-3 border-end  pt-5 text-white bg-dark '}>
                        <Sidebar />
                    </div>

                    <div className={fullView ? 'col-12' : 'col-lg-10 col-9'}>
                        <div className="header">
                            <div className='d-flex justify-content-between align-items-center py-2'>
                                <IconButton onClick={(e) => setFullView(!fullView ? true : false)} aria-label="menu" >
                                    <MenuIcon fontSize="inherit" />
                                </IconButton>
                                <h3 className='text-center'> UpdateOrder</h3>
                            </div>

                            {/* update order section */}
                            <div className="container my-4">
                                <div className="row gy-4">
                                    <div className="col-md-8">
                                        {/* sipping info */}
                                        <div className='shadow-sm p-2'>
                                            <h4 className='border-bottom d-inline-block pb-2 mb-3'> Shipping Info</h4>
                                            <p><span className='fw-bold px-1'> Product Id:</span> {order && order._id}</p>
                                            <div className="shipping-info">
                                                <p> <span className='fw-bold px-1'> Name :</span>{order.user && order.user.name} </p>
                                                <p> <span className='fw-bold px-1'> Phone :</span>{order.shippingInfo && order.shippingInfo.phoneNo} </p>
                                                <p> <span className='fw-bold px-1'> Address :</span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.city} , ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`} </p>
                                            </div>
                                        </div>
                                        {/* Cart items */}

                                        {/* payment status */}
                                        <div className='shadow-sm p-2 mt-3'>
                                            <h4 className='border-bottom d-inline-block pb-2 mb-3'> Payment Status</h4>
                                            <div className="shipping-info">
                                                <p> <span className='fw-bold px-1'> status :</span>{order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"} </p>
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
                                        <div className='mt-5'>
                                            <h4 className='border-bottom d-inline-block pb-2 mb-3'> Your cart Items</h4>
                                            {
                                                order.orderItems && order.orderItems.map((item, i) => (
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
                                            <div >
                                                <div className='modal-size-reg'>
                                                    <div>
                                                        <h5 className='text-center mb-3 text-muted  '>Process Order</h5>
                                                    </div>
                                                    <form onSubmit={handleSubmit} >

                                                        <div className='row'>
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control form-control-modify" id="exampleFormControlSelect1">
                                                                        <option className='disabled' value="">Select Category</option>
                                                                        {order.orderStatus === "processing" && (<option className='' value="shipped">shipped</option>)}
                                                                        {order.orderStatus === "shipped" && (<option className='' value="delivered">delivered</option>)}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <button type='submit' disabled={loading ? true : false || status === "" ? true : false} className='btn btn2 w-100 '> Done</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <button onClick={paymentHandle} className='btn btn-primary'> Proceed to Payment </button> */}
                                </div>
                            </div>

                            {/* update order section end */}

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default UpdateOrder