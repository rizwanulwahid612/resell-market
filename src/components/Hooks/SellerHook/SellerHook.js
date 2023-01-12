import {  useEffect, useState } from 'react';

const SellerHook = (email) => {
const [isSeller,setIsSeller]=useState(false);
const [isSellerLoading,setIsSellerLoading] = useState(true);
  
    useEffect(()=>{
       if(email){
        fetch(`https://resell-server-rizwanulwahid612.vercel.app/sellers/seller/${email}`)
        .then(res => res.json())
            .then(data => {
                setIsSeller(data.isSeller)
                setIsSellerLoading(false)
            })
       }
    },[email])
  
    return [isSeller,isSellerLoading]
};

export default SellerHook;