import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const MyProducts = () => {

    const { data=[], refetch,isLoading } = useQuery({
        queryKey: ['addproducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/addproducts');
            const data = await res.json();
            return data;
        }
    });
   if(isLoading){
    return <div>
        <h1>Looding....</h1>
    </div>
   }
   console.log(data)
    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                data.map(addedProduct=><div className="card w-80 my-5 bg-base-100 shadow-xl">
                <figure><img src={addedProduct.image} alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Shoes!
                    <div className="badge badge-secondary">{addedProduct.brand}</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div> 
                    <div className="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>)
            }
            
        </div>
    );
};

export default MyProducts;