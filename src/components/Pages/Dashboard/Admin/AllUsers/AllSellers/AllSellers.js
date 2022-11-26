import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {
  const {data=[],refetch,isLoading} = useQuery({ 

    queryKey: ['allsellers'], 
    queryFn:async()=>{
      const res = await fetch('http://localhost:8000/allsellers',{
        headers: {
          authorization: `bearer ${localStorage.getItem('token')}`
      }
      });
      const data=await res.json();
      return data;
      
    } })

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
        <th>Seller Name</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
   
      {data &&
        data?.map(sellers=><tr key={sellers._id}>
         
          <td>
            <div className="flex items-center space-x-3">
              <div>
                <div className="font-bold">{sellers.name}</div>
                <div className="text-sm opacity-50">{sellers._id}</div>
              </div>
            </div>
          </td>
          <td>
           {sellers.email}
            <br/>
            <span className="badge badge-ghost badge-sm">Seller Email</span>
          </td>
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