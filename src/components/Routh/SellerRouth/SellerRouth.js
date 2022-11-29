import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import SellerHook from '../../Hooks/SellerHook/SellerHook';

const SellerRouth = ({children}) => {
    const {user,loader}=useContext(AuthContext);
    const location = useLocation();
    const [isSeller,isSellerLoading]=SellerHook(user?.email)
    

    if(loader || isSellerLoading){
        return <div><h1>Looding...</h1></div>
    }
    if(user && isSeller){
        return children;
    }
    return <Navigate to='/login' state={{form:location}} replace></Navigate>
    
};

export default SellerRouth;