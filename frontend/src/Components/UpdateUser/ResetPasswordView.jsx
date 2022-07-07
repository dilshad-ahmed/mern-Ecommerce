import React,{useState, useEffect} from 'react';
import '../Login/loginStyle.css';
import { useNavigate , useParams} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { resetError, resetPassword } from '../../features/user/forgotPassSlice';
import {toast} from 'react-toastify'



const ResetPasswordView = () => {

    
    const dispatch = useDispatch()
    const { loading, success, error} = useSelector((state) => state.forgotPass)
    
    const navigate = useNavigate()
    const {token} = useParams();


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({password, confirmPassword , token}));
    }

    useEffect(()=> {
        if(error) {
            toast.error(error)
            dispatch(resetError())
        }
        
        if(success){
            toast.success("Password Reset Successfully")
            navigate("/login")
        }
    },[dispatch, success , error])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="reg-container">
        <div className='modal-size-reg'> 
            <div>
            <h5 className='text-center mb-3 text-muted  '>New Password</h5>
            </div>
            <form onSubmit={handleSubmit} >
                
                <div className="form-group">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control form-control-modify" name="password" placeholder=' ' id='c2'  autoComplete="off" autoFocus required />
                    <label htmlFor="c2" className="input-text">New Password</label>
                </div>
                <div className="form-group">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control form-control-modify" name="confirmPassword" placeholder=' ' id='c3'  autoComplete="off" autoFocus required />
                    <label htmlFor="c3" className="input-text">Confirm Password</label>
                </div>
                
       
                <div className='d-flex justify-content-center'>
                    {/* <Link to="/account" className='btn btn-primary btn-sm rounded-3 ' >Go back </Link> */}
                    <button type='submit' className='btn btn2 btn-sm rounded-3'> Save Changes</button>
                </div>
                {/* <Link to="/forgot/password" className='text-black-50 text-decoration-none d-flex justify-content-center mt-2 small '> forgot password</Link> */}
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default ResetPasswordView