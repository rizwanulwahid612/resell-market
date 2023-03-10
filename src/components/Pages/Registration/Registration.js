import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import TokenHook from '../../Hooks/TokenHook/TokenHook';
import Lottie from "lottie-react";
import reg from "../../assets/icons/signup.json";

const Registration = () => {
    const {createUser,updateProfileUser}=useContext(AuthContext)
    const { register, handleSubmit,formState: { errors } } = useForm();
    const [signUpError,setSignupError]=useState('')

    
    const [emailToken,setEmailToken]=useState('');
    const[token]=TokenHook(emailToken);
    const navigate = useNavigate();
    if(token){
        navigate('/');
    }
    
    const onSubmit = data =>{
      setSignupError('')
        const name= data.name;
        const email= data.email;
        const password = data.password;
        console.log(name,email,password);
        createUser(email,password)
        .then(result=>{
            const user=result.user;
            console.log(user)
            toast('User create successfully')
            const userInfo = {
              displayName: name,
              
          }
          updateProfileUser(userInfo)
            .then(() => {
              sellersInfo(name,email)
          })
          .catch((error) =>console.log(error));
        })
        .catch((error) => {
            console.log(error.message);
            setSignupError(error.message)
          });
    } 

    const sellersInfo =(name,email)=>{
      const sellers={name,email}
      fetch('https://resell-server-rizwanulwahid612.vercel.app/sellers',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(sellers)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        toast.success('Seller information has been taken')
        /////////////////////////
        setEmailToken(email)
      })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6"><div>
            <Lottie className='w-72' animationData={reg} loop={true} />
            </div></p>
          </div>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name"className="input input-bordered"  {...register("name", { required: true, maxLength: 30})} />
                {errors.name && <p role="alert">{errors.name?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email"className="input input-bordered"  {...register("email", { 
                    required:'plz enter your email',
                    pattern: {
                             value: /\S+@\S+/,
                             message: "Entered value does not match email format"
          } })} />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" {...register("password", { 
                    required: 'plz give password', 
                    minLength: {
                    value: 5,
                    message: "min length is 5"
          } })} />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
                <div style={{marginBottom:'30px'}}>
                <Link to="/login" className="label-text-alt link link-hover">Already have any account. plz Login?</Link>
                </div>
              </div>
              <div className="  btn btn-info">
                <button type="submit">Register</button>
             
              </div>
              {signUpError && <p>{signUpError}</p>}
            </form>
          </div>
        </div>
      </div>
    );
};

export default Registration;