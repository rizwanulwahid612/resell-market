import React, { useContext, useState } from 'react';
// import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns';
import { AuthContext } from '../../../../Context/AuthProvider';
import BookingModal from './BookingModal';
import { useQuery } from '@tanstack/react-query';


const MyProductsPage = () => {
    const {user}=useContext(AuthContext)
    const [productPrice,setProductPrice]=useState('')
    const [seleclectedDate, setSelectedDate] = useState(new Date());
    const date = format(seleclectedDate, 'PP');


    const loadProduct = useLoaderData()
    console.log(loadProduct)


    return (
    
        <div>
            <div className='mx-auto w-96'>
                <DayPicker
                    mode="single"
                    selected={seleclectedDate}
                    onSelect={setSelectedDate}

                />
                <p>You have selected date: {format(seleclectedDate, 'PP')}</p>

            </div>

            {
                loadProduct.map(product => <div className="card card-compact w-3/4 mx-auto bg-base-100 shadow-xl my-10">
                    <figure><img className='w-96' src={product.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <div className='text-1xl font-bold grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mx-auto w-5/6 my-6 mx-6 '>
                            <p>Product's Id: {product.productid}</p>
                            <p>Location: {product.location}</p>
                            <p>Original Price: {product.originalprice}</p>
                            <p>Posted Date: {product.posteddate}</p>
                            <p>Posted Time: {product.postedtime}</p>
                            <p>Resell Price: {product.resellprice}</p>
                            <p>Seller Name: {product.sellername}</p>
                            <p>Years Of Used: {product.yearsofused}</p>

                            <div className="rating rating-sm">
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />

                            </div>
                        </div>

                        <div className="card-actions justify-end">
                            <label  onClick={()=>setProductPrice(product)} htmlFor="my-modal-3" className="btn btn-primary">Booking Now</label>
                       
                        </div>
                    </div>
                <BookingModal
                 productPrice={productPrice}
                 seleclectedDate={seleclectedDate}
                ></BookingModal>
                </div>)
            }

        </div>
    );
};

export default MyProductsPage;