import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Categories = () => {
   

  //new category
  const { data=[], isLoder } = useQuery({
    queryKey: ['sellersproducts'],
    queryFn: async () => {
        const res = await fetch('https://resell-server-rizwanulwahid612.vercel.app/category');
        const data = await res.json();
        return data;
    }
});
if(isLoder){
    return <div><h1>Loading...</h1></div>
}

   
   
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 my-10'>

            {data &&
                data?.map(categories => <div className="card w-72 glass" style={{boxShadow:'3px 4px 8px gray'}}>
                    <figure><img src={categories.image} alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">BRAND: {categories.brand}</h2>
                        
                            
                        <p>{categories.quality}</p>
                        <div className='grid grid-cols-3'>
                            <p>Rating: {categories.rating}</p>
                            
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                
                            </div>
                            
                        </div>
                        <div className="card-actions justify-end">
                            <Link to={`/productpage/${categories.categoryid}`}><button className="btn btn-primary">Brand</button></Link>
                        </div>
                    </div>
                  
                </div>)
                
            }
            
        </div>
    );
};

export default Categories;