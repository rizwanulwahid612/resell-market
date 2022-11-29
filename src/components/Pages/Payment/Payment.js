import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const productPayment = useLoaderData();
    const { BookingDate, Brand, Buyer, BuyerEmail, BuyerPhone, Image, Location, Seller, SellersEmail, price, product, _id } = productPayment;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <figure><img className="rounded-xl" src={Image} alt="Shoes" /></figure>

                <h2 className="card-title text-2xl text-green-600 font-bold">
                    {product}
                    <div className="badge p-4 badge-error text-white">Plz Pay: $ {price}</div>
                </h2>
                <p className='font-bold'>Please pay for <span className='text-green-400'>{product}</span> on  <br />
                    <span className='text-red-600 font-bold'>{BookingDate}
                    </span>
                </p>
                <p className='text-yellow-600 font-bold'>Seller:{Seller}, Email:{SellersEmail}</p>
                <div>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm 
                        productPayment={productPayment}
                        />
                    </Elements>
                </div>

            </div>
        </div>
    );
};

export default Payment;