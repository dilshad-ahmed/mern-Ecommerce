import React from 'react'
import {Link} from 'react-router-dom'
import successIcon from '../../Images/success-icon.png'

const SuccessView = () => {
  return (
    <>
        <div className="container">
            <div className="success-box vh-100 d-flex justify-content-center align-items-center">
                <div className=' text-center'>
                    <img src={successIcon} alt="success icon" width="100"/>
                    <h4 className='pt-4'> Payment Successful</h4>
                    <Link to="/orders" className='text-decoration-none text-black-50 '> check your order list</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default SuccessView