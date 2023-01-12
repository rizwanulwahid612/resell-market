import React from 'react';
import Carosol from '../Carosol/Carosol';
import Lottie from "lottie-react";
import sellonline from "../../../assets/icons/sell-online.json";
import Categories from '../Catagories/Categories';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
const loader = useLoaderData();
console.log(loader);
    return (
        <div>
            <Carosol></Carosol>
           <h1 className='text-2xl text-center font-bold text-green-600'>Advertise area</h1> 
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
            <Lottie className='w-80'  animationData={sellonline} loop={true} />
            </div>
            
               
           
          {
            loader?.map(advitice=><div className="card w-96 mx-auto">
                <div className="hero w-72 bg-base-200 mx-auto w-1/2">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={advitice.image} className="rounded shadow-2xl" alt=''/>
                       <Link to={`/productpage/${advitice.categoryid}`}><button className='btn btn-info'>Buy Now</button></Link> 
                        <div>
                            <h1 className="text-3xl font-bold"> 40% Off News!</h1>
                            <p className="py-6 text-1xl font-bold">Hurry up !. Product Limited..</p>
                        </div>
                    </div>
                </div>

            </div>)
          }
     
            </div>
            <h1 className='text-2xl text-center font-bold text-green-600'>Category area</h1> 
            <Categories></Categories>
        </div>
    );
};

export default Home;