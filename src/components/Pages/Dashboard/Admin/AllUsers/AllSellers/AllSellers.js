import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";

const AllSellers = () => {
 
  const {data=[],refetch,isLoading} = useQuery({ 
 
    queryKey: ['allsellers'], 
    queryFn:async()=>{
      const res = await fetch('http://localhost:8000/allsellers',{
      //   headers: {
      //     authorization: `bearer ${localStorage.getItem('token')}`
      // }
      });
      const data=await res.json();
      return data;
      
    } 
  });

  const handleMakeAdmin = id => {
    fetch(`http://localhost:8000/sellers/admin/${id}`,{
        method: 'PUT',
        headers:{
            authorization: `bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(data => {
         console.log(data)
        if(data.modifiedCount > 0){
            toast.success('Make Admin SuccessFully')
            refetch();
        }
    })
}

const handleMakeSeller = id =>{
  fetch(`http://localhost:8000/sellers/seller/${id}`,{
    method: 'PUT',
    headers:{
        authorization: `bearer ${localStorage.getItem('token')}`
    }
})
.then(res=>res.json())
.then(data => {
     console.log(data)
    if(data.modifiedCount > 0){
        toast.success('Make seller SuccessFully')
        refetch();
    }
})
}



    const handleDeletedsellers =(sellers)=>{
      fetch(`http://localhost:8000/seller/${sellers?._id}`,{
           method:'DELETE',
        //    headers:{
        //     authorization: `bearer ${localStorage.getItem('token')}`
        // }
      })
      .then(res=>res.json())
      .then(data=>{
          if(data?.deletedCount > 0){
              refetch();
              toast.success(`Seller ${sellers.name} deleted successfully`)
          }
          console.log(data)
         
      })
 }


    if(isLoading){
      return <div><h1>Loading...</h1></div>
    }
    return (
        <div className="overflow-x-auto w-full">
  <table className="table w-full">

    <thead>
      <tr>
        <th>Count</th>
        <th>Seller Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Seller</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
   
      {data &&
        data?.map((sellers,i)=><tr key={sellers._id}>
         <th>{i+1}</th>
          <td>
            <div className="flex items-center space-x-3">
              <div>
               
                { sellers?.roles ==='seller' && <h1 className="btn btn-xs btn-info text-white"><FaCheckCircle/>{sellers.name}</h1>}
            {
              sellers?.roles !=='seller' && <button disabled className="btn btn-xs btn-warning">{sellers.name}</button>
            }
            
                <div className="text-sm opacity-50">{sellers._id}</div>
              </div>
            </div>
          </td>
          <td>
           {sellers.email}
            <br/>
            <span className="badge badge-ghost badge-sm"> Email</span>
          </td>
          <td>{ sellers?.role !=='admin' && <button onClick={()=>handleMakeAdmin(sellers._id)} className="btn btn-xs btn-warning">Make Admin</button>}
            {
              sellers?.role ==='admin' && <button disabled className="btn btn-xs btn-info">Admin</button>
            }
            </td>


            <td>{ sellers?.roles !=='seller' && <button onClick={()=>handleMakeSeller(sellers._id)} className="btn btn-xs btn-warning">Make Seller</button>}
            {
              sellers?.roles ==='seller' && <button disabled className="btn btn-xs btn-info">Seller</button>
            }
            </td>
          {/* <td>{sellers?.role !== 'admin' && <button onClick={() => handleMakeAdmin(sellers._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
          <th>
          <button onClick={()=>handleDeletedsellers(sellers)} className="btn btn-xs">Delete</button>
          </th>
        </tr>)
      }
   
    </tbody>
    
  </table>
</div>
    );
};

export default AllSellers;