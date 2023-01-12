import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const RepotedItems = () => {
  const repotedItem= useLoaderData();
  console.log(repotedItem); 

  const [getItem,setGetItem]=useState(repotedItem)

  const handleRepotedDelete=(bookingItem)=>{

    const remining = getItem?.filter(product=>product._id !==bookingItem?._id);
    setGetItem(remining);

    fetch(`https://resell-server-rizwanulwahid612.vercel.app/repotedproduct/${bookingItem?._id}`, {
      method: 'DELETE',
      //     headers:{
      //      authorization: `bearer ${localStorage.getItem('token')}`
      //  }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.deletedCount > 0) {
         // refetch()
          toast.success(`${bookingItem?.name} deleted successfully`)
        }
        console.log(data)

      })
    console.log(bookingItem?._id)
  }
    return (
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 g-4 ml-6'>
            
      {getItem &&
        getItem?.map(bookingItem=><div className="card w-80 bg-base-100 shadow-xl mt-6 mb-6">
        <figure><img className='h-56' src={bookingItem.Image} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {bookingItem.product}
            <div className="badge badge-secondary">{bookingItem.Brand}</div>
          </h2>
          <p>Price: ${bookingItem.price}</p>
          <p>Booking Id: {bookingItem._id}</p>
          <p>Booking Date: {bookingItem.BookingDate}</p>
          <p>Seller Name : {bookingItem.Seller}</p>
          <p>Seller Email: {bookingItem.SellersEmail}</p>  
          <button onClick={() => handleRepotedDelete(bookingItem)}  className="btn btn-warning">Delete Reported Item</button>
        </div>
      </div>)
  }
 
</div>
    );
};

export default RepotedItems;