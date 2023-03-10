import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';

const MyBuyers = () => {
  const {user}=useContext(AuthContext)
    const { data=[], isLoder } = useQuery({
        queryKey: ['buyersinfo',user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resell-server-rizwanulwahid612.vercel.app/buyersinfo?email=${user?.email}`,{
              headers:{
                authorization: `bearer ${localStorage.getItem('token')}`
            }
            });
            const data = await res.json();
            console.log(data)
            return data;
        }
    });
    if(isLoder){
        return <div><h1>Loading...</h1></div>
    }
    return (
        <div className='mt-6'>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">

    <thead>
      <tr>
        <th></th>
        <th>Buyer Name & Email</th>
        <th>Payment:true/false</th>
        <th>Product & Phone Num</th>
        <th>Buyer Area</th>
        <th>Booking Date</th>
      </tr>
    </thead>
    <tbody>

{
    data?.map((buyerinfo,i)=><tr>
      <th>{i+1}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={buyerinfo?.Image} alt='/' />
              </div>
            </div>
            <div>
              <div className="font-bold">{buyerinfo?.Buyer}</div>
              <div className="text-sm opacity-50">{buyerinfo?.BuyerEmail}</div>
            </div>
          </div>
        </td>
        <td>
        {buyerinfo?.price && !buyerinfo?.paid && <span className='text-red-500'>Not Paid</span>

                  }
        {
           buyerinfo?.price && buyerinfo?.paid && <span className='text-green-500'>Paid</span>
          }
        </td>
        <td>
        {buyerinfo?.product}
        
          <br/>
          <span className="badge badge-ghost badge-sm">Phone: {buyerinfo?.BuyerPhone}</span>
        </td>
        <td>{buyerinfo?.Location}</td>
        <th>
          <button className="btn btn-ghost btn-xs">{buyerinfo?.BookingDate}</button>
        </th>
      </tr>)
}
      


    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyBuyers;