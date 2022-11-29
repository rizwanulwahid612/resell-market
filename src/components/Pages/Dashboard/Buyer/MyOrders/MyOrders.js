import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
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
    return (
        <div className=''>
            
                {myorders &&
                  myorders?.map(bookingItem=><div className="card w-full bg-base-100 shadow-xl mt-6 mb-6">
                  <figure><img src={bookingItem.Image} alt="Shoes" /></figure>
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
                  </div>
                </div>)
            }
           
        </div>
    );
};

export default MyOrders;