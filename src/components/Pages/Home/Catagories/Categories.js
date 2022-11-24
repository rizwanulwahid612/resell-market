import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Categories = () => {
    const {data= [], refetch} = useQuery({
        queryKey: ['sellersproducts'],
        queryFn: async() =>{
            const res = await fetch('http://localhost:8000/sellersproducts');
            const data= await res.json();
            return data;
        }
    });
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 my-10'>
            {
                data.map(categories=> <div className="card w-full glass">
                <figure><img src={categories.image} alt="car!"/></figure>
                <div className="card-body">
                  <h2 className="card-title">{categories.brand}</h2>
                  <p>{categories.quality}</p>
                  <p>{categories.rating}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Brand</button>
                  </div>
                </div>
              </div> )
            }
        </div>
    );
};

export default Categories;