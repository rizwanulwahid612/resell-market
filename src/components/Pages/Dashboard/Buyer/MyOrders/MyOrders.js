import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyOrders = () => {

    const { data=[], isLoder } = useQuery({
        queryKey: ['sellersproducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/myordersbookings');
            const data = await res.json();
            return data;
        }
    });
    if(isLoder){
        return <div><h1>Loading...</h1></div>
    }
    return (
        <div>
            <h1>data:{data.length}</h1>
        </div>
    );
};

export default MyOrders;