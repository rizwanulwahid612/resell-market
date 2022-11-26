import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


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
        <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error 404</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <button className='btn btn-warning' onClick={handleLogOut}>Log Out</button>
      </div>
    );
};

export default ErrorPage;