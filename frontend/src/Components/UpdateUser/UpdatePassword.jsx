import React,{useState, useEffect} from 'react';
import '../Login/loginStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { updatePassword } from '../../features/user/profile';
import { profileReset ,resetError } from '../../features/user/profile';
import { loadUser } from '../../features/user/loginSlice';
import {toast} from "react-toastify"

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const { error:profileError, isUpdated} = useSelector((state) => state.profile)
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePassword({oldPassword, newPassword, confirmPassword}));
    }

    useEffect(()=> {
        if(profileError) {
            toast.error(profileError);
            dispatch(resetError());
        }
        if(isUpdated){
            dispatch(profileReset());
            toast.success("password updated successfully")
            dispatch(loadUser())
            navigate("/account")
        }
    },[dispatch, isUpdated , profileError])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="reg-container">
        <div className='modal-size-reg'> 
            <div>
            <h5 className='text-center mb-3 text-muted  '>Update Password</h5>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-12">
                    <div className="form-group">
                        <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" className="form-control form-control-modify" name="oldPassword" placeholder=' ' id='c1'  autoComplete="off" autoFocus required />
                        <label htmlFor="c1" className="input-text"> Old passwrod</label>
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control form-control-modify" name="newPassword" placeholder=' ' id='c2'  autoComplete="off" autoFocus required />
                    <label htmlFor="c2" className="input-text">New Password</label>
                </div>
                <div className="form-group">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control form-control-modify" name="confirmPassword" placeholder=' ' id='c3'  autoComplete="off" autoFocus required />
                    <label htmlFor="c3" className="input-text">Confirm Password</label>
                </div>
                
       
                <div className='d-flex justify-content-between'>
                    <Link to="/account" className='btn btn-primary btn-sm rounded-3 ' >Go back </Link>
                    <button type='submit' className='btn btn2 btn-sm rounded-3'> Save Changes</button>
                </div>
                <Link to="/forgot/password" className='text-black-50 text-decoration-none d-flex justify-content-center mt-2 small '> forgot password</Link>
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default UpdatePassword