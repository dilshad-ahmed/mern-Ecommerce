import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { deleteUserAdmin ,deleteUserReset } from '../../../features/userAdmin/deleteUserSlice'
import { getUsersList } from '../../../features/userAdmin/userListSlice'
import {toast} from 'react-toastify'

import { DataGrid } from '@mui/x-data-grid'
import Sidebar from '../Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const Users = () => {

  const [fullView, setFullView] = useState(false)
  const {loading, users , error} = useSelector((state) => state.userList)
  const { isDeleted , error:deleteError} = useSelector((state) => state.deleteUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteUserHandler = (id) =>{
    dispatch(deleteUserAdmin(id));

  }

  const columns = [
    {field : "id" , headerName : "User Id", minWidth : 150, flex : 1 },
    {
      field : "email" ,
      headerName : "Email",
      minWidth : 200,
      flex: 1
    },
    {
      field : "name" ,
      headerName : "Name",
      minWidth : 50
    },
    {
      field : "role" ,
      headerName : "Role",
      minWidth: 80
    },
    {
      field : "action" ,
      headerName : "Actions",
      sortable : "false",
      minWidth : 100, 
      renderCell : (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon/>
            </Link>
            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon/>
            </Button>
          </>
        )
      }
    },
    
  ]

  const rows =[]

  users && users.forEach((item) =>{
    rows.push({
      id : item._id,
      email : item.email,
      role : item.userRole,
      name : item.name,

    })
  })

  // console.log(rows)



useEffect(()=> {
  if(isDeleted) {
    // navigate("/admin/dashboard")
    toast.success("user Deleted successfully")
    dispatch(deleteUserReset());
  }

    dispatch(getUsersList())
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
                  <h3 className='text-center'> All Products</h3>
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

export default Users