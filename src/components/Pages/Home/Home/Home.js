import React from 'react';
import Carosol from '../Carosol/Carosol';
import Lottie from "lottie-react";
import sellonline from "../../../assets/icons/sell-online.json";
import Categories from '../Catagories/Categories';

const Home = () => {

    return (
        <div>
            <Carosol></Carosol>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
            <Lottie  animationData={sellonline} loop={true} />
            </div>
            
            <div>
                <div className="hero  bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src="https://placeimg.com/260/400/arch " className="rounded shadow-2xl" alt=''/>
                        <div>
                            <h1 className="text-3xl font-bold">Box Office News!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in.</p>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            <Categories></Categories>
        </div>
    );
};

export default Home;