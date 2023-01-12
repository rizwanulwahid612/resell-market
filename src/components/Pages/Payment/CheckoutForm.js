import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({productPayment}) => {

    const [cardError,setCardError]=useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret,setClientSecret]=useState('');
    const stripe = useStripe();
    const elements = useElements();

    const {productId ,BookingDate, Brand, Buyer, BuyerEmail, BuyerPhone, Image, Location, Seller, SellersEmail, price, product, _id } = productPayment;

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("https://resell-server-rizwanulwahid612.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('token')}`
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
        setSuccess('');
      setProcessing(true);
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
          return;
        }
        if(paymentIntent.status === "succeeded"){
          setSuccess('Congrats your payment completed');
          setTransactionId(paymentIntent.id)
   
          const payment = {
           price,
           transactionId: paymentIntent.id,
           BuyerEmail,
           bookingId: _id,
           productId:productId
       }
       fetch('https://resell-server-rizwanulwahid612.vercel.app/payments', {
           method: 'POST',
           headers: {
               'content-type': 'application/json',
               authorization: `bearer ${localStorage.getItem('accessToken')}`
           },
           body: JSON.stringify(payment)
       })
           .then(res => res.json())
           .then(data => {
               console.log(data);
               if (data.insertedId) {
                   setSuccess('Congrats! your payment completed');
                   setTransactionId(paymentIntent.id);


                   fetch(`https://resell-server-rizwanulwahid612.vercel.app/deletebookingproduct/${productId}`, {
                    method: 'DELETE',
                    
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data?.deletedCount > 0) {
                        // refetch();
                      
                        
                        toast.success(`${payment.productId} deleted successfully`)
                      }
                      console.log(data)
              
                    })
                  console.log(payment.productId)


                  fetch(`https://resell-server-rizwanulwahid612.vercel.app/deletepaidadvitisproduct/${productId}`, {
                    method: 'DELETE',
                    
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data?.deletedCount > 0) {
                        // refetch();
                      
                        
                        toast.success(`${payment.productId} deleted successfully`)
                        
                      }
                      console.log(data)
              
                    })
                  console.log(payment.productId)

               }
           })
          
         }
         setProcessing(false)
         console.log('paymentIntent',paymentIntent)
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
          type="submit" disabled={!stripe || !clientSecret || processing}> 
        Pay
      </button>
    </form>
    <p className='text-red-500'>{cardError}</p>
    {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>You got transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;