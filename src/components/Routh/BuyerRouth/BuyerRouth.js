import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import BuyerHook from "../../Hooks/BuyerHook/BuyerHook";



const BuyerRouth = ({children}) => {
    const {user,loader}=useContext(AuthContext);
    const location = useLocation();
    const [isBuyer,isBuyerLoading]=BuyerHook(user?.email)
    

    if(loader || isBuyerLoading){
        return <div><h1>Looding...</h1></div>
    }
    if(user && isBuyer){
        return children;
    }
    return <Navigate to='/login' state={{form:location}} replace></Navigate>
    
};

export default BuyerRouth;