import React,{useState, useEffect} from 'react';
import '../Login/loginStyle.css';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../features/cart/cartSlice';
import {Country , State} from 'country-state-city'

const ShippingView = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {shippingInfo} = useSelector((state) => state.cart)

    // const [country, setCountry] = useState(shippingInfo.country)
    // const [state, setState] = useState(shippingInfo.state)
    // const [city, setCity] = useState(shippingInfo.city)
    // const [address, setAddress] = useState(shippingInfo.address)
    // const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    // const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo) 


    const [inputs, setInputs] = useState({});    


    const {loading , isAuthenticated, error} = useSelector((state) => state.register)

    const handleChange = (e) => {
        
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((pre) => ({...pre,[name]:value}))
        
    }

    // console.log(inputs)

    const shippingHandle = (e) => {
        e.preventDefault();

        if(inputs.phoneNo.length < 10 || inputs.phoneNo.length > 10  ){
            return alert("please enter 10 digit mobile no.")
        }

        dispatch(saveShippingInfo({...inputs}));
        navigate('/order/confirm')
    }

    useEffect(()=> {
        if(error){
            alert(error)
        }
        if(isAuthenticated){
            navigate("/account")
        }
    },[dispatch, isAuthenticated, error])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="reg-container container">
        <div className='modal-size-reg'> 
            <div>
            <h5 className='text-center mb-3 text-muted  '>Shipping Details</h5>
            </div>
            <form onSubmit={shippingHandle} encType="multipart/form-data">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <input value={inputs.address} onChange={handleChange}  type="text" className="form-control form-control-modify" name="address" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                            <label htmlFor="c1" className="input-text"> Address</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input value={inputs.city} onChange={handleChange} type="text" className="form-control form-control-modify" name="city" placeholder=' ' id='c4'  autoComplete="off" autoFocus required />
                            <label htmlFor="c4" className="input-text">City Name</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input value={inputs.pinCode} onChange={handleChange} type="text" className="form-control form-control-modify" name="pinCode" placeholder=' ' id='c2'  autoComplete="off" autoFocus required />
                            <label htmlFor="c2" className="input-text">Pincode</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input value={inputs.phoneNo} onChange={handleChange} type="number" maxLength={10} className="form-control form-control-modify" name="phoneNo" placeholder=' ' id='c3'  autoComplete="off" autoFocus required />
                    <label htmlFor="c3" className="input-text">phoneNo</label>
                </div>
                
                
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <select value={inputs.country} onChange={handleChange} name="country" className="form-control form-control-modify" id="exampleFormControlSelect1" required>
                            <option className='disabled'>Select Country</option>
                            {
                                Country && Country.getAllCountries().map( (item) => (
                                    <option key={item.isoCode} value={item.isoCode}> {item.name} </option>
                                ) )
                            }
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        {
                            inputs.country && 
                        
                        <div className="form-group">
                            <select value={inputs.state} onChange={handleChange} name="state" className="form-control form-control-modify" id="exampleFormControlSelect2" required>
                            <option className='disabled'>Select Country</option>
                            {
                                State && State.getStatesOfCountry(inputs.country).map( (item) => (
                                    <option key={item.isoCode} value={item.isoCode}> {item.name} </option>
                                ) )
                            }
                            </select>
                        </div>
                        }   
                    </div>
                </div> 
                {/* <div className="form-group">
                    <textarea className="form-control form-control-modify" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div> */}

                <div className='d-flex justify-content-between'>
                    {/* <Link to="/login" className='btn btn-primary ' >Already have account ? Login </Link> */}
                    <button type='submit' className='btn btn2 '> Next</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default ShippingView