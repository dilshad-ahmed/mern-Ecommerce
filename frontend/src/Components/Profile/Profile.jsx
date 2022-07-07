import React,{useState, useEffect} from 'react'
import { useSelector, useParams } from 'react-redux'
import {Link} from 'react-router-dom'
import userImg from '../../Images/user-img.png'


const Profile = () => {

    const{loading , user , isAuthenticated } = useSelector((state) => state.login)
 
  return (
    <>
        <div className='container my-5'>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 ">
                    <div className="profile align-items-center d-flex flex-column justify-content-center profile">
                        <div>
                            {
                                isAuthenticated ? (<img src={user.avtar.url} alt={user.name} width="150" className="img-fluid rounded-circle m-4 shadow" />) 
                                : ( <img src={userImg} alt={user.name} width="150" className="img-fluid rounded-circle m-4 shadow"/> )
                            }
                        </div>
                        <Link to="/me/update" className="btn btn-secondary mb-4"> Edit Profile</Link>
                    </div>
                </div>
                <div className="col-md-6 p-4 shadow rounded-3 ">
                    <div className="profile-details">
                        <div className="mb-4">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div className="mb-4">
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className="mb-4">
                            <h4>Joined on</h4>
                            <p>{String(user.createdAt).substr(0,10)}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-4'>
                        <Link to="/orders" className='btn btn-primary'> My Order</Link>
                        <Link to="/password/update" className='btn btn-dark'> Change Password</Link>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default Profile