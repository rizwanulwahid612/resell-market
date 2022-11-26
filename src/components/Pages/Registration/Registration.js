import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';


const Registration = () => {
    const {createUser,updateProfileUser}=useContext(AuthContext)
    const { register, handleSubmit,formState: { errors } } = useForm();
    

    const navigate=useNavigate();
    // const [emailToken,setEmailToken]=useState('');
    // const[token]=TokenHook(emailToken);
    // if(token){
    //     navigate('/');
    // }
    
    const onSubmit = data =>{
        const name= data.name;
        const email= data.email;
        const password = data.password;
        console.log(name,email,password);
        createUser(email,password)
        .then(result=>{
            const user=result.user;
            navigate('/login')
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
          });
    } 

    const sellersInfo =(name,email)=>{
      const sellers={name,email}
      fetch('http://localhost:8000/sellers',{
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
        // setEmailToken(email);
      })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                
                <Link to="/login" className="label-text-alt link link-hover">Already have any account. plz Login?</Link>
              </div>
              <div className="  btn btn-info">
                <button type="submit">Register</button>
              {/* <input type="submit" value='Register'/> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Registration;