import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';

const MyOrders = () => {
const {user}=useContext(AuthContext)
    const { data:myorders=[], isLoder } = useQuery({
        queryKey: ['oducts',user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8000/myordersbookings?email=${user?.email}`,{
              headers:{
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            });
            
          //   ?email=${user?.email}`,{
          //       headers:{
          //     authorization: `bearer ${localStorage.getItem('token')}`
          // }
          //   });
            const data = await res.json();
            console.log(data)
            return data;
        }
    });
    if(isLoder){
        return <div><h1>Loading...</h1></div>
    }

    const handleRepotedProduct=(bookingItem)=>{
      fetch(`http://localhost:8000/repotedproduct/${bookingItem?._id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingItem)
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          toast.success(`${bookingItem?.name} is repoted successfully`)
        })
    }

    return (
        <div className='grid grid-cols-2 g-4'>
            
                {myorders &&
                  myorders?.map(bookingItem=><div className="card w-80 bg-base-100 shadow-xl mt-6 mb-6">
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
                    <div className="card-actions justify-end">

                    

                      <div>{bookingItem.price && !bookingItem.paid &&
                  <Link to={`/dashboard/payments/${bookingItem._id}`}>
                  <button className="btn btn-xs btn-info">Pay</button>
                  </Link>
                  }
                
                {
                  bookingItem.price && bookingItem.paid && <span className='text-green-500'>Paid</span>
                }</div>


                    </div>
                    
                    <button onClick={() => handleRepotedProduct(bookingItem)}  className="btn btn-warning">Report to Admin</button>
                  </div>
                </div>)
            }
           
        </div>
    );
};

export default MyOrders;