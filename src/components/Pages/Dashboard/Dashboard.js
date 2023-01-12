import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    // /userrole/:email
    const { isLoading, error, data=[],refetch } = useQuery({
      queryKey: ['repoData',user?.email],
      queryFn: async() =>{
         const res = await fetch(`https://resell-server-rizwanulwahid612.vercel.app/userrole/${user?.email}`,{
          // headers:{
          //   authorization:`bearer ${localStorage.getItem('token')}`
          // }
         })
         const data = await res.json();
         return data;
      }
    })
    return (
        <div className='flex justify-center text-gray-500 items-center mt-4'>
   
   {
        ( <>
            { !isLoading && data?.role === 'admin'?
             (<>
              <p className='text-3xl font-medium'>Admin Dashboard </p>
            
            </>) : 
             
             <>
             { !isLoading && data?.roles ==='seller'?
             (<>
             <p className='text-3xl font-medium'> Seller Dashboard.</p>
             </>):
              
             
            (<p className='text-3xl font-medium'> User Dashboard.</p>)
            
          
           
             }
             </>}
          </> ) 
        } 

      </div>
    );
};

export default Dashboard;