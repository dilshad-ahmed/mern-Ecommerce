import React,{useState, useEffect} from 'react';
import '../Login/loginStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import { forgotPassword, resetError, resetMessage } from '../../features/user/forgotPassSlice';
import { useSelector , useDispatch } from 'react-redux';
import {toast} from 'react-toastify'



const ForgotPasswordView = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message, error} = useSelector((state) => state.forgotPass)

    const [email, setEmail] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({email}));
    }

    useEffect(()=> {
        if(message){
            toast.success(message)
            dispatch(resetMessage())
            navigate("/login")
        }
        if(error){
            toast.error(error)
            dispatch(resetError())
        }
    },[dispatch, error , message])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="reg-container">
        <div className='modal-size-reg'> 
            <div>
            <h5 className='text-center mb-3 text-muted  '>forgot Password</h5>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-12">
                    <div className="form-group">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-modify" name="email" placeholder=' ' id='c1'  autoComplete="off" autoFocus required />
                        <label htmlFor="c1" className="input-text"> email</label>
                    </div>
                    </div>
                </div>
                
       
                <div className='d-flex justify-content-between'>
                    <Link to="/account" className='btn btn-primary btn-sm rounded-3 ' >Go back </Link>
                    <button type='submit' className='btn btn2 btn-sm rounded-3'> send email</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default ForgotPasswordView