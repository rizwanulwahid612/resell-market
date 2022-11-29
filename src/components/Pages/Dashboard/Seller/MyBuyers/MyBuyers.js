import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyBuyers = () => {
    const { data=[], isLoder } = useQuery({
        queryKey: ['buyersinfo'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/buyersinfo');
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
        <th>Product & Phone Num</th>
        <th>Buyer Area</th>
        <th>Booking Date</th>
      </tr>
    </thead>
    <tbody>

{
    data.map((buyerinfo,i)=><tr>
      <th>{i+1}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={buyerinfo.Image} alt='/' />
              </div>
            </div>
            <div>
              <div className="font-bold">{buyerinfo.Buyer}</div>
              <div className="text-sm opacity-50">{buyerinfo.BuyerEmail}</div>
            </div>
          </div>
        </td>
        <td>
        {buyerinfo.product}
        
          <br/>
          <span className="badge badge-ghost badge-sm">Phone: {buyerinfo.BuyerPhone}</span>
        </td>
        <td>{buyerinfo.Location}</td>
        <th>
          <button className="btn btn-ghost btn-xs">{buyerinfo.BookingDate}</button>
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