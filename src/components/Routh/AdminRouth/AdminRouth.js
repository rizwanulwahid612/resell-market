import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import AdminHook from '../../Hooks/AdminHook/AdminHook';




const AdminRouth = ({children}) => {
    const {user,loader}=useContext(AuthContext);
    const location = useLocation();
    const [isAdmin,isAdminLoading]=AdminHook(user?.email)
    

    if(loader || isAdminLoading){
        return <div><h1>Looding...</h1></div>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{form:location}} replace></Navigate>
    
};

export default AdminRouth;