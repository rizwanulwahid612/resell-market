import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import TokenHook from '../../Hooks/TokenHook/TokenHook';
import { FcGoogle } from "react-icons/fc";
const Login = () => {
    const {loginUser,resetPassword,GoogleSignin}=useContext(AuthContext);
    const [reset,setReset]=useState('');
    const { register, handleSubmit,formState: { errors } } = useForm();
    const location = useLocation();
    // const navigate = useNavigate();
    // const from= location.state?.from?.pathname || '/';

    // const [emailToken,setEmailToken]=useState('')

    // const [token]=TokenHook(emailToken);
    // if(token){
    //   navigate(from, { replace: true });
    // }

    const onSubmit = data =>{
        const email= data.email;
        const password = data.password;
        console.log(email,password);

        loginUser(email,password)
        .then(result=>{
            const user=result.user;
            console.log(user)
            // setEmailToken(email)

        })
        .catch((error) => {
            console.log(error.message);
          });

    } 
  const handleGoogleLogin=()=>{
    GoogleSignin()
    .then((result) => {
      const user = result.user;
      console.log(user,user.displayName,user.email)
      buyersInfo(user.displayName,user.email)

    }).catch((error) => {
    console.log(error)
    });
  }

  const buyersInfo =(name,email)=>{
    const buyers={name,email}
    fetch('http://localhost:8000/buyers',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(buyers)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      toast.success('Buyer information has been taken')
    })
  }

    const handleforgotPass=(event)=>{
        event.preventDefault();
        const email=event.target.value;
        setReset(email)
    }

    const forgetUserPass=()=>{
        if(!reset){
            toast('plz chek write your email')
            return;
        }
        resetPassword(reset)
        .then(() => {
            toast('plz chek your email befor reset password')
          })
        .catch((error) => {
            console.log(error.message);
          });
    }


    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div onBlur={handleforgotPass} className="form-control">
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
                <label className="label">
                 <button onClick={forgetUserPass}><Link className="label-text-alt link link-hover">Forgot password?</Link></button>
                </label>
          <label className="label">
            <Link to="/register" className="label-text-alt link link-hover">Don't have any acoouunt? plz Register</Link>
          </label>
        </div>
        <div className="btn btn-info">
          <button type="submit">LogIN</button>
        </div>
      </form>
      <div className="mx-6 btn mb-10 btn-warning">
      <button style={{display:'flex'}} onClick={handleGoogleLogin} type="submit"><FcGoogle></FcGoogle> GoogleLogin</button>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;