import React,{useState, useEffect} from 'react';
import '../Login/loginStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import userDefaultImg from '../../Images/user-img.png';
import { registerUser , resetError } from '../../features/user/registerSlice';
import { useSelector , useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

const Register = () => {

    const [inputs, setInputs] = useState({});    
    const [avtarPreview , setAvtarPreview] = useState(userDefaultImg)
    const [avtar, setAvtar] = useState()

    const dispatch = useDispatch()
    const {loading , isAuthenticated, error} = useSelector((state) => state.register)
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

    console.log(inputs)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({...inputs,avtar}));
        // console.log("submited",{...inputs,avtar})
    }

    useEffect(()=> {
        if(error){
            toast.error(error);
            dispatch(resetError())
        }
        if(isAuthenticated){
            navigate("/account")
        }
    },[dispatch, isAuthenticated, error])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="reg-container">
        <div className='modal-size-reg'> 
            <div>
            <h5 className='text-center mb-3 text-muted  '>Create New Account</h5>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-12">
                    <div className="form-group">
                            <input value={inputs.name} onChange={handleChange}  type="text" className="form-control form-control-modify" name="name" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                            <label htmlFor="c1" className="input-text"> Name</label>
                    </div>
                    </div>
                    {/* <div className="col-6">
                    <div className="form-group">
                            <input type="text" className="form-control form-control-modify" name="Lname" placeholder=' ' id='c2' autoComplete="off" autoFocus required />
                            <label htmlFor="c2" className="input-text">Last Name</label>
                    </div>
                    </div> */}
                </div>
                <div className="form-group">
                    <input value={inputs.email} onChange={handleChange} type="email" className="form-control form-control-modify" name="email" placeholder=' '  autoComplete="off" autoFocus required />
                    <label htmlFor="c3" className="input-text">Email</label>
                </div>
                <div className="form-group">
                    <input value={inputs.password} onChange={handleChange} type="password" className="form-control form-control-modify" name="password" placeholder=' '  autoComplete="off" autoFocus required />
                    <label htmlFor="c3" className="input-text">password</label>
                </div>
                
                 
                <div className="form-group d-flex">
                <img src={avtarPreview} height="35" className='px-3 rounded-circle'></img>    
                    <input  onChange={handleChange} accept="image/*" type="file" className=" form-control form-control-modify" name="avtar" placeholder=' '  autoComplete="off" autoFocus required />
                    {/* <label htmlFor="c3" className="input-text">upload</label> */}
                </div>
                {/* <div className="row">
                    <div className="col-6">
                    
                    <div className="form-group">
                        <input type="text" className="form-control form-control-modify" id="exampleFormControlInput3" placeholder="Mobile No"/>
                    </div>
                    </div>
                    <div className="col-6">
                    <div className="form-group">
                        <select className="form-control form-control-modify" id="exampleFormControlSelect1">
                        <option className='disabled'>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        </select>
                    </div>
                    </div>
                </div> 
                <div className="form-group">
                    <textarea className="form-control form-control-modify" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>*/}

                <div className='d-flex justify-content-between'>
                    <Link to="/login" className='btn btn-primary ' >Already have account ? Login </Link>
                    <button type='submit' className='btn btn2 '> Submit</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default Register