import {  useEffect, useState } from 'react';

const BuyerHook = (email) => {
const [isBuyer,setIsBuyer]=useState(false);
const [isBuyerLoading,setIsBuyerLoading] = useState(true);
  
    useEffect(()=>{
       if(email){
        fetch(`http://localhost:8000/buyer/buyer/${email}`)
        .then(res => res.json())
            .then(data => {
                setIsBuyer(data.isBuyer)
                setIsBuyerLoading(false)
            })
       }
    },[email])
  
    return [isBuyer,isBuyerLoading]
};

export default BuyerHook;