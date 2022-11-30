import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Lottie from "lottie-react";
import notfound from '../../assets/icons/not-found.json';

const ErrorPage = () => {
    const {logOut}=useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate();
    const handleLogOut=()=>{
      logOut()
      .then(() => {
       navigate('/login')
      }).catch((error) => {
       console.log(error)
      });
    }
    
    return (
        <div className='mx-auto w-4/5 mt-20 mb-20' id="error-page">
           
        
        <button className='btn btn-warning' onClick={handleLogOut}>Log Out</button>
        <p className='text-3xl font-bold'>
          <i>{error.statusText || error.message}</i>
        </p>
        <Lottie className='w-5/6' animationData={notfound} loop={true} />
      </div>
    );
};

export default ErrorPage;