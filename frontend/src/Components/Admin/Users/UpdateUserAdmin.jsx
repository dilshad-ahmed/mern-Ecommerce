import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { createProductAdmin , newProductReset} from '../../../features/product/createProductSlice'
import { updateProductAdmin, updateProductReset } from '../../../features/product/updateProductSlice'
import Sidebar from '../Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { updateUserAdmin, updateUserReset } from '../../../features/userAdmin/updateUserSlice'
import { getUserDetails } from '../../../features/userAdmin/userDetailsSlice'

const UpdateUserAdmin = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading , error: updateError, isUpdated} = useSelector((state) => state.updateUser);
    const {user} = useSelector((state)=> state.userDetails)


    const [fullView, setFullView] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
   



    const handleSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("name", name);
        myform.set("email", email);
        myform.set("userRole", userRole);

        dispatch(updateUserAdmin({id:id, userData: myform}));
    }

    

    useEffect(()=> {
        if(!user) {
            dispatch(getUserDetails(id))
        }
        else if(user && user._id !== id){
            dispatch(getUserDetails(id))
        }else{
            setName(user.name);
            setEmail(user.email);
            setUserRole(user.userRole);
        }

        if(isUpdated) {
            alert("user updated successfully");
            navigate("/admin/users");
            dispatch(updateUserReset());
        }

    },[dispatch, isUpdated , id, user])

    

  return (
    <>
        <div className="container-fluid vh-80">
        <div className='row'>
          <div className={fullView ? 'd-none' : 'col-lg-2 col-3 border-end vh-80 pt-5 text-white bg-dark '}>
            <Sidebar/>
          </div>
          
          <div className={fullView ? 'col-12' : 'col-lg-10 col-9'}>
              <div className="header">
                <div className='d-flex justify-content-between align-items-center py-2'>
                <IconButton  onClick={(e) => setFullView(!fullView ? true : false)} aria-label="menu" >
                  <MenuIcon  fontSize="inherit" />
                </IconButton>
                  <h3 className='text-center'> Update User</h3>
                </div>
                <div className=" d-flex justify-content-center align-items-center">
                    <div className="reg-container">
                    <div className='modal-size-reg'> 
                        <div>
                        <h5 className='text-center mb-3 text-muted  '>Update User</h5>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={name} onChange={(e) => setName(e.target.value)}  type="text" className="form-control form-control-modify" name="name" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                                        <label htmlFor="c1" className="input-text"> Name</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-modify" name="price" placeholder=' '  autoComplete="off" autoFocus required />
                                        <label htmlFor="c3" className="input-text">Email</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <div className="form-group">
                                        <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="form-control form-control-modify" id="exampleFormControlSelect1">
                                        <option className='disabled' value="">Choose Role</option>
                                        <option className='' value="admin"> Admin </option>
                                        <option className='' value="user"> User </option>
                                        
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <button type='submit' disabled={loading ? false : true} className='btn btn2 w-100'> Update </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>

                {/* //update user end */}


              </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default UpdateUserAdmin