import React from 'react';
import img1 from '../../../assets/images/img1.webp';
import img2 from '../../../assets/images/img2.webp';
import img3 from '../../../assets/images/img3.webp';
import CarosolTheme from '../CarosolTheme/CarosolTheme';


const Carosol = () => {
    const caroData = [
        {
            image: img1,
            prev: 3,
            id: 1,
            next: 2
        },
        {
            image: img2,
            prev: 1,
            id: 2,
            next: 3
        },
        {
            image: img3,
            prev: 2,
            id: 3,
            next: 1
        }
       
    ]
    return (
        <div className="carousel w-full h-[30vw] mb-8 mt-5 bg-black">
        {
            caroData.map(slide => <CarosolTheme
                key={slide.id}
                slide={slide}
            ></CarosolTheme>)
        }
        
    </div>
    );
};

export default Carosol;