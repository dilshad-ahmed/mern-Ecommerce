import React,{useState, useEffect} from 'react';
import '../Login/loginStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import userDefaultImg from '../../Images/user-img.png';
import { registerUser } from '../../features/user/registerSlice';
import { useSelector , useDispatch } from 'react-redux';
import { updateUser } from '../../features/user/profile';
import { profileReset , resetError } from '../../features/user/profile';
import { loadUser } from '../../features/user/loginSlice';
import {toast} from 'react-toastify'

const UpdateUser = () => {

    const [inputs, setInputs] = useState({});    
    const [avtarPreview , setAvtarPreview] = useState(userDefaultImg)
    const [avtar, setAvtar] = useState()

    const dispatch = useDispatch()
    const {loading , isAuthenticated, user,  error} = useSelector((state) => state.login)
    const { error:updateError, isUpdated} = useSelector((state) => state.profile)
    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.target.name ==="avtar"){
            const reader = new FileReader();
            
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvtarPreview(reader.result);
                    setAvtar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);

        }else{
            e.preventDefault();
            const name = e.target.name;
            const value = e.target.value;
            setInputs((pre) => ({...pre,[name]:value}))
        }

    }

   

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({...inputs,avtar}));
        // console.log("submited",{...inputs,avtar})
    }

    useEffect(()=> {
        if(error){
            alert(error)
            
        }
        if(updateError){
            toast.error(updateError)
            dispatch(resetError());
        }
        if(isUpdated){
            toast.success("profile updated")
            dispatch(profileReset());
            dispatch(loadUser())
            navigate("/account")
        }else{
            setInputs({name:user.name, email: user.email});
            setAvtarPreview(user.avtar.url)
        }
    },[dispatch, isUpdated, error , updateError])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="reg-container">
        <div className='modal-size-reg'> 
            <div>
            <h5 className='text-center mb-3 text-muted  '>Update Profile</h5>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-12">
                    <div className="form-group">
                            <input value={inputs.name} onChange={handleChange}  type="text" className="form-control form-control-modify" name="name" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                            <label htmlFor="c1" className="input-text"> Name</label>
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <input value={inputs.email} onChange={handleChange} type="email" className="form-control form-control-modify" name="email" placeholder=' '  autoComplete="off" autoFocus required />
                    <label htmlFor="c3" className="input-text">Email</label>
                </div>
                
                 
                <div className="form-group d-flex">
                <img src={avtarPreview} height="35" className='px-3 rounded-circle'></img>    
                    <input  onChange={handleChange} accept="image/*" type="file" className=" form-control form-control-modify" name="avtar" placeholder=' '  autoComplete="off" autoFocus />
                </div>

                <div className='d-flex justify-content-between'>
                    <Link to="/account" className='btn btn-primary ' >Go back </Link>
                    <button type='submit' className='btn btn2 '> Save Changes</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default UpdateUser