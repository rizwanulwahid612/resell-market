import React from 'react';
import Carosol from '../Carosol/Carosol';
import Lottie from "lottie-react";
import sellonline from "../../../assets/icons/sell-online.json";
import Categories from '../Catagories/Categories';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
const loader = useLoaderData();
console.log(loader);
    return (
        <div>
            <Carosol></Carosol>
           <h1 className='text-2xl text-center font-bold text-green-600'>Advitse area</h1> 
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
            <Lottie  animationData={sellonline} loop={true} />
            </div>
            
               
           
          {
            loader?.map(advitice=><div>
                <div className="hero w-72 bg-base-200 mx-auto w-1/2">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={advitice.image} className="rounded shadow-2xl" alt=''/>
                        <div>
                            <h1 className="text-3xl font-bold"> 40% Off News!</h1>
                            <p className="py-6 text-1xl font-bold">Hurry up !. Product Limited..</p>
                        </div>
                    </div>
                </div>

            </div>)
          }
           
            </div>
            <Categories></Categories>
        </div>
    );
};

export default Home;