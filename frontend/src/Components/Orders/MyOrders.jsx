import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { myAllOrders } from '../../features/cart/myOrdersSlice'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const MyOrders = () => {

    const dispatch = useDispatch();
    const  { loading , error , orders} = useSelector((state) => state.myOrders)
    const  { user} = useSelector((state) => state.login)

    const columns = [ 
        {
            field : "id",
            headerName : "Order Id",
            minWidth : 180,
            flex : 1,
        },
        {
            field : "status",
            headerName : "status",
            flex : 1,
        },
        {
            field : "itemQty",
            headerName : "Item Qty",
            type : "number",
            flex : 1,
            minWidth : 80,
        },
        {
            field : "amount",
            headerName : "amount",
            type : "number",
            flex : 1,
        },
        {
            field : "action",
            headerName : "action",
            type : "number",
            sortable : false,
            flex : 1,
            renderCell : (params) => {
                return(
                    <Link to={`/order/${params.getValue(params.id, "id")}`} >
                        <button className='btn btn-primary btn-sm'> Details</button>
                    </Link>
                )
            }
        },
    ]
    
    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemQty : item.orderItems.length,
            id : item._id,
            status : item.orderStatus,
            amount : item.totalPrice,
        })
    })

    useEffect(() => {
      if(error) {
        toast(error);
      }
      dispatch(myAllOrders())

    }, [ dispatch , error])
    

  return (
    <>
        <div className='container '>
            <h5 className='text-center my-4'> {user && user.name} order list</h5>
            <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick className="myOrderTable" pageSize={10} />
        </div>
        <ToastContainer />
    </>
  )
}

export default MyOrders