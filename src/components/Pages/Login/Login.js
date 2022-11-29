import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import TokenHook from '../../Hooks/TokenHook/TokenHook';
const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, resetPassword, GoogleSignin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('')
  const [reset, setReset] = useState('');
const [loading,setLoafing]=useState(true)
const [error,setError]=useState('')


  const [emailToken, setEmailToken] = useState('')
  console.log(emailToken)
  const [token] = TokenHook(emailToken);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  if (token) {
    navigate(from, { replace: true });
  }

  const onSubmit = data => {
    setLoginError('')
    const email = data.email;
    const password = data.password;
    const options = data.options;
    console.log(email, password, options);
    if(options==='Seller'){
     
        fetch(`http://localhost:8000/allsellers?email=${email}`,{
          method: 'PUT',
          headers:{
              authorization: `bearer ${localStorage.getItem('token')}`
          }
      })

      .then(res=>res.json())
      .then(data => {
           console.log(data)
          if(data.modifiedCount > 0){
              toast.success('Make Seller SuccessFully')
    loginUser(email, password)
    .then(result => {
      const user = result.user;
      setLoafing(false)
      // handleMakeSeller(email)
      console.log(user)
      setEmailToken(email)

    })
    .catch((error) => {
      console.log(error.message);
      setLoginError(error.message)
    });
          }
      
      })
    
    }
    if(email){
      fetch(`http://localhost:8000/sellers/seller/${email}`)
      .then(res => res.json())
          .then(data => {
            loginUser(email, password)
            .then(result => {
              const user = result.user;
              // handleMakeSeller(email)
              console.log(user)
              setEmailToken(email)
        
            })
            .catch((error) => {
              console.log(error.message);
              setLoginError(error.message)
            });
           console.log(data)
           setLoafing(false)
          })
     }
 
    
    
if(loading){
  return <div>
    <h1>Looding....</h1>
  </div>
}
    

  }

  const handleGoogleLogin=()=>{
    GoogleSignin()
    .then((result) => {
      const user = result.user;
      const currentUser = {
        email: user.email
    }
    console.log(currentUser);

    //get token
    fetch('http://localhost:8000/jwt', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(currentUser)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data)
    fetch(`http://localhost:8000/allbuyers?email=${user.email}`,{
      method: 'PUT',
  })
  .then(res=>res.json())
  .then(data => {
       console.log(data)
      if(data.modifiedCount > 0){
          toast.success('Make Buyer SuccessFully')
  setLoafing(false)
 

.catch((error) => {
  console.log(error.message);
  setLoginError(error.message)
});
      }
  
  })
  localStorage.setItem('token', data.token);
    navigate(from, { replace: true });
    setLoginError('')
    toast.success('successfully login')

});
    })
    .catch((error) => {
     console.log(error);
    });
  }


  // const handleGoogleLogin = () => {
  //   GoogleSignin()
  //     .then((result) => {
  //       const user = result.user;
  //       const currentUser = {
  //         email: user.email
  //     }
  //     console.log(currentUser);
  //       console.log(user, user.displayName, user.email)
        
  //       fetch(`http://localhost:8000/allbuyers?email=${user.email}`,{
  //         method: 'PUT',
  //     })
  //     .then(res=>res.json())
  //     .then(data => {
  //          console.log(data)
  //         if(data.modifiedCount > 0){
  //             toast.success('Make Buyer SuccessFully')
  //     setLoafing(false)
     
  
  //   .catch((error) => {
  //     console.log(error.message);
  //     setLoginError(error.message)
  //   });
  //         }
      
  //     })

  //       navigate(from, { replace: true });
  //       setLoginError('')
  //       toast.success('successfully login')

  //     }).catch((error) => {
  //       console.log(error)
  //     });
  // }

  
 


  const handleforgotPass = (event) => {
    event.preventDefault();
    const email = event.target.value;
    setReset(email)
  }

  const forgetUserPass = () => {
    if (!reset) {
      toast('plz chek write your email')
      return;
    }
    resetPassword(reset)
      .then(() => {
        toast('plz chek your email befor reset password')
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
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
              <input type="email" placeholder="email" className="input input-bordered"  {...register("email", {
                required: 'plz enter your email',
                pattern: {
                  value: /\S+@\S+/,
                  message: "Entered value does not match email format"
                }
              })} />
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
                }
              })} />
              {errors.password && <p role="alert">{errors.password?.message}</p>}
              <label className="label">
                <button onClick={forgetUserPass}><Link className="label-text-alt link link-hover">Forgot password?</Link></button>
              </label>
              <div>
                {loginError && <p>{loginError}</p>}
              </div>

             
              <label className="label">
                <Link to="/register" className="label-text-alt link link-hover">Don't have any acoouunt? plz Register</Link>
              </label>
            </div>

            <select name='options'{...register("options", { required: true, maxLength: 30})} className="select select-bordered w-full max-w-xs">
                <option disabled selected>Buyer</option>
                <option>Seller</option>
                <option>Buyer</option>
                
              </select>
              
            <div className="btn btn-info">
              <button type="submit">LogIN</button>
            </div>
          </form>
          <div className="mx-6 btn mb-10 btn-warning">
            <button style={{ display: 'flex' }} onClick={handleGoogleLogin} type="submit"><FcGoogle></FcGoogle> GoogleLogin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;