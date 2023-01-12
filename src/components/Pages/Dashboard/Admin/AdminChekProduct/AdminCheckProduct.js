import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';

const AdminCheckProduct = () => {
    const { user } = useContext(AuthContext);
  
    const url = 'https://resell-server-rizwanulwahid612.vercel.app/allproductadmin';
    
  
    const {data:myproducts =[],refetch,isLoading} = useQuery({ 
      queryKey: ['myproducts'], 
      queryFn: async()=>{
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } 
    
    })
    if (isLoading) {
      return <div>
        <h1>Looding....</h1>
      </div>
    }
  
    const handleDelete = (addedProduct) => {
      fetch(`https://resell-server-rizwanulwahid612.vercel.app/addproducts/${addedProduct?._id}`, {
        method: 'DELETE',
      
      })
        .then(res => res.json())
        .then(data => {
          if (data?.deletedCount > 0) {
            refetch();
            toast.success(`${addedProduct?.name} deleted successfully`)
          }
          console.log(data)
  
        })
    }
  
    const handleDeleteAdvitiseProduct = (addedProduct) => {
      fetch(`https://resell-server-rizwanulwahid612.vercel.app/advitis/${addedProduct?._id}`, {
        method: 'DELETE',
      
      })
        .then(res => res.json())
        .then(data => {
          if (data?.deletedCount > 0) {
            refetch();
            toast.success(`${addedProduct?.name} deleted successfully`)
          }
          console.log(data)
  
        })
      console.log(addedProduct?._id)
    }
  
   
  
    const handleAdvitiseProduct = (addedProduct) => {
      fetch(`https://resell-server-rizwanulwahid612.vercel.app/advitiseproduct/${addedProduct?._id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(addedProduct)
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          toast.success(`${addedProduct?.name} is added successfully`)
        })
    }
    console.log(myproducts)
    return (
     
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 g-4 ml-6'>
        {myproducts &&
  myproducts?.map(addedProduct => <div key={addedProduct?._id} className="card w-80 bg-base-100 shadow-xl mt-6 mb-6">
    <figure><img className='h-56' src={addedProduct?.image} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">
        {addedProduct?.name}
        <div className="badge badge-secondary">{addedProduct?.brand}</div>
      </h2>
      <p>Product's id: {addedProduct?.productid}</p>
      <p>Posted Date: {addedProduct?.posteddate}</p>
      <p>Posted Time: {addedProduct?.postedtime}</p>
      <p>Resell Price: {addedProduct?.resellprice}</p>
      <p>Original Price: {addedProduct?.originalprice}</p>
      <p>Seller Name: {addedProduct?.sellername}</p>
      <p>Seller Email: {addedProduct?.selleremail}</p>
      <p>Seller Location: {addedProduct?.location}</p>
      <p>Years Of Used: {addedProduct?.yearsofused}</p>
      <div className="card-actions justify-center">
        <button onClick={() => handleDelete(addedProduct)} className="btn btn-sm btn-secondary">Delete Product</button>

        <button onClick={() => handleDeleteAdvitiseProduct(addedProduct)} className="btn btn-sm btn-error">Delete Advitise</button>

        <button onClick={() => handleAdvitiseProduct(addedProduct)} className="btn btn-sm btn-info">Make Advitise</button>



      </div>
    </div>
  </div>)
}
  </div>
    );
  };

export default AdminCheckProduct;