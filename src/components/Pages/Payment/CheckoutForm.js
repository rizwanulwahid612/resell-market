import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({productPayment}) => {

    const [cardError,setCardError]=useState('');
    const [clientSecret,setClientSecret]=useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { BookingDate, Brand, Buyer, BuyerEmail, BuyerPhone, Image, Location, Seller, SellersEmail, price, product, _id } = productPayment;

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:8000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json"
      //jwt token
      },
        body: JSON.stringify({ price}),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit =async(event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }
    
       
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log( error);
          setCardError(error.message)
        }
         else {
         setCardError('')
        }
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                name: Buyer,
                email:BuyerEmail
              },
            },
          },
        );
        if(confirmError){
          setCardError(confirmError.message)
        }
      };
    
    return (
        <div>
             <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-sm mt-4 btn-primary' 
      // type="submit" disabled={!stripe }>
          type="submit" disabled={!stripe || !clientSecret }> 
        Pay
      </button>
    </form>
    <p className='text-red-500'>{cardError}</p>
        </div>
    );
};

export default CheckoutForm;