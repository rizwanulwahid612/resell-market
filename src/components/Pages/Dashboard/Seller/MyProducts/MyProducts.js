import React, { useContext } from 'react';
import {useQuery} from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';
import Products from './Products';



const MyProducts = () => {
  const { user } = useContext(AuthContext);
  //  const [advitise,setAdvitise]=useState({})
  //  console.log(advitise)
  // const [desabled,setDesabled]=useState(false);
  const url = `http://localhost:8000/addproducts?email=${user?.email}`;
  

  const {data:myproducts =[],refetch,isLoading} = useQuery({ 
    queryKey: ['myproducts',user?.email], 
    queryFn: async()=>{
      const res = await fetch(url,{
             headers:{
           authorization: `bearer ${localStorage.getItem('token')}`
       }
      });
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
    fetch(`http://localhost:8000/addproducts/${addedProduct?._id}`, {
      method: 'DELETE',
      //     headers:{
      //      authorization: `bearer ${localStorage.getItem('token')}`
      //  }
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
    fetch(`http://localhost:8000/advitis/${addedProduct?._id}`, {
      method: 'DELETE',
      //     headers:{
      //      authorization: `bearer ${localStorage.getItem('token')}`
      //  }
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
    fetch(`http://localhost:8000/advitiseproduct/${addedProduct?._id}`, {
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
   
    <div className='grid grid-cols-2 gap-2'>
    <Products
    myproducts={myproducts}
    handleDelete={handleDelete}
    handleDeleteAdvitiseProduct={handleDeleteAdvitiseProduct}
    handleAdvitiseProduct={handleAdvitiseProduct}
    ></Products>
    </div>
  );
};

export default MyProducts; 