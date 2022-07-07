import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// import { fetchAdminProducts } from '../../../features/product/adminProductSlice'
import { getOrderList } from '../../../features/orderAdmin/orderAdminSlice'
import { deleteOrderAdmin,deleteOrderReset } from '../../../features/orderAdmin/deleteOrderSlice'
import { DataGrid } from '@mui/x-data-grid'
import Sidebar from '../Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {toast} from 'react-toastify'

const Orders = () => {

  const [fullView, setFullView] = useState(false)
  const {loading, orders , error} = useSelector((state) => state.allOrders)
  const { isDeleted , error:deleteError} = useSelector((state) => state.deleteOrder)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteOrderHandler = (id) =>{
    dispatch(deleteOrderAdmin(id));

  }

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
        field : "itemsQty",
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
      field : "action" ,
      headerName : "Actions",
      sortable : "false",
      minWidth : 100, 
      renderCell : (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon/>
            </Link>
            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon/>
            </Button>
          </>
        )
      }
    },
    
  ]

  const rows =[]

  orders && orders.forEach((item) =>{
    rows.push({
      id : item._id,
      itemsQty : item.orderItems.length,
      amount : item.totalPrice,
      status : item.orderStatus,

    })
  })

  // console.log(rows)



useEffect(()=> {
  if(isDeleted) {
    toast.success("Order deleted")
    navigate("/admin/dashboard");
    dispatch(deleteOrderReset());
  }

    dispatch(getOrderList())
},[dispatch,isDeleted])

  return (
    <div className="container-fluid ">
        <div className='row'>
          <div className={fullView ? 'd-none' : 'col-lg-2 col-3 border-end  pt-5 text-white bg-dark '}>
            <Sidebar/>
          </div>
          
          <div className={fullView ? 'col-12' : 'col-lg-10 col-9'}>
              <div className="header">
                <div className='d-flex justify-content-between align-items-center py-2'>
                  <IconButton onClick={(e) => setFullView(!fullView ? true : false)} aria-label="menu" >
                    <MenuIcon  fontSize="inherit" />
                  </IconButton>
                  <h3 className='text-center'> All Orders</h3>
                </div>

                <div className=' vh-80'> 
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    disableSelectionOnClick
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default Orders