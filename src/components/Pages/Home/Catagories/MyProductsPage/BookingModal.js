import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';

const BookingModal = ({productPrice,seleclectedDate}) => {
    const {user}=useContext(AuthContext)
    const date = format(seleclectedDate, 'PP')
    
        const handleBooking =(event) =>{
           
            event.preventDefault();
            const form = event.target;
            const name= form.name.value;
            const email= form.email.value;
            const phone = form.phone.value;
            const location = form.location.value;
            console.log(name,email,phone)
    
            const booking ={
               Buyer: name,
               BuyerEmail:email,
               Brand:productPrice.brand,
               product: productPrice.name,
               price:productPrice.resellprice,
               Location:location,
               BuyerPhone:phone,
               BookingDate: date,
    
            }
            console.log(booking)
            fetch('http://localhost:8000/bookings',{
              method:'POST',
              headers:{
                  'content-type':'application/json'
              },
              body:JSON.stringify(booking)
          })
          .then(res => res.json())
          .then(data =>{
              if(data.acknowledged){
                        
                          toast.success('Booking confirmed')
                       
                      }
                      else{
                          toast.error(data.message)
                      }
                      
          })
     
           }

    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                   
               
                    <div className="form-control m-10' ">
                    <p className=''>Product Name: <input name='productname' type="text" defaultValue={productPrice.name} disabled placeholder="Type here" className="input w-full input-bordered" /></p> 
                    </div>
                 
                  
                    <form onSubmit={handleBooking}  className="card-body">

           <div className="form-control m-10'">
                     <p className=''> <input type="text" name='date' defaultValue={date} disabled placeholder="Type here" className="input w-full input-bordered" /></p>
                     </div>                  
      <div className="form-control">
          
          <p className=''>Buyer's Name: <input name="name" defaultValue={user?.displayName} readOnly type="text" placeholder="Your Name"  className="input input-bordered" /></p>
        </div>
        <div className="form-control">
         
          <p className=''>Buyer's Email: <input type="email" name="email" placeholder="Email" defaultValue={user?.email} readOnly className="input input-bordered" /></p>
        </div>
        <div className="form-control">
         
          <p>Product Price: <input type="text" name="price" placeholder="Item Price" defaultValue={productPrice.resellprice} readOnly className="input input-bordered" /></p>
        </div>
        <div className="form-control">
        
        <p className=''>Buyer Locate: <input type="text" name="location" placeholder="Location" className="input input-bordered" /></p>
      </div>

        <div className="form-control">
        
          <p className=''>Buyer Phone: <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered" /></p>
        </div>
       
      
        <div className="form-control mt-6">
        <input className='btn btn-accent w-full max-w-xm' type="submit" name="" value="Submit" />
        </div>
      </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;