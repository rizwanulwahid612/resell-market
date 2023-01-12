import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {
  const {data=[],refetch,isLoading} = useQuery({ 

    queryKey: ['allbuyers'], 
    queryFn:async()=>{
      const res = await fetch('https://resell-server-rizwanulwahid612.vercel.app/allbuyers',{
        headers: {
          authorization: `bearer ${localStorage.getItem('token')}`
      }
      });
      const data=await res.json();
      return data;
      
    } })

    const handleDeletedBuyers =(buyers)=>{
      fetch(`https://resell-server-rizwanulwahid612.vercel.app/buyers/${buyers?._id}`,{
           method:'DELETE',
        //    headers:{
        //     authorization: `bearer ${localStorage.getItem('token')}`
        // }
      })
      .then(res=>res.json())
      .then(data=>{
          if(data?.deletedCount > 0){
              refetch();
              toast.success(`Buyer ${buyers.name} deleted successfully`)
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
        <th>count</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
   
      {data &&
        data?.map((buyers,i)=><tr key={buyers._id}>
         <th>{i+1}</th>
        
          <td>
           {buyers.email}
            <br/>
            <span className="badge badge-ghost badge-sm">buyers Email</span>
          </td>
          <th>
          <button onClick={()=>handleDeletedBuyers(buyers)} className="btn btn-xs">Delete</button>
          </th>
        </tr>)
      }
   
    </tbody>
    
  </table>
</div>
    );
};

export default AllSellers;