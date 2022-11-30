import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';

const AddProducts = () => {
    const {user}=useContext(AuthContext);
    const [seleclectedDate, setSelectedDate] = useState(new Date());
    const date = format(seleclectedDate, 'PP');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const imgKey = process.env.REACT_APP_imgbb_key;
   
    
    const onSubmit = data => {
        const image=data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        const url =`https://api.imgbb.com/1/upload?key=${imgKey}`
        fetch(url, {
        method: 'POST',
       body: formData
    })
    .then(res => res.json())
    .then(result => {
     if(result.success){
      console.log(result)
     const product={
           image:result.data.url,
           name:data.name,
           brand:data.brand,
           categoryid:data.categoryid,
           productid:data.productid,
           location:data.location,
           productcondition:data.productcondition,
           resellprice:parseInt(data.resellprice),
           originalprice:parseInt(data.originalprice),
           yearsofused:data.yearsofused,
           posteddate:data.posteddate,
           postedtime:data.postedtime,
           sellername:data.sellername,
           selleremail:data.email,
           
     }
   
        console.log(product)
        fetch('http://localhost:8000/addproducts',{
          method:'POST',
          headers:{
            'content-type':'application/json',
            // authorization: `bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            toast.success(`${data.name} is added successfully`)
            toast.success(`${data.sellername}'s information has been taken`)
             navigate('/dashboard/myproducts')
        })
    
     }
     console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
       
       
      }
  


    return (
         <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add Products</h1>

        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input type="text" placeholder="Product Name" className="input input-bordered"  {...register("name", { required: true })} />
              {errors.name && <p role="alert">{errors.name?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Brand Name: Apple / HP / Sony </span>
              </label>
              <input  type="text" placeholder="Brand Name" className="input input-bordered"  {...register("brand", { required: true })} />
              {errors.brand && <p role="alert">{errors.brand?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Apple for: 1 // HP for: 2 // Sony for: 3 ;"only use number"</span>
              </label>
              <input type="text" placeholder="For Same Brand Give All Same Category_id" className="input input-bordered"  {...register("categoryid", { required: true, maxLength: 30 })} />
              {errors.categoryid && <p role="alert">{errors.categoryid?.message}</p>}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product's Id</span>
              </label>
              <input type="text" placeholder="Random number" className="input input-bordered"  {...register("productid", { required: true })} />
              {errors.productid && <p role="alert">{errors.productid?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Seller Name</span>
              </label>
              <input type="text" defaultValue={user?.displayName} readOnly placeholder="Product Name" className="input input-bordered"  {...register("sellername", { required: true, maxLength: 30 })} />
              {errors.sellername && <p role="alert">{errors.sellername?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" defaultValue={user?.email} readOnly className="input input-bordered"  {...register("email", {
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
                <span className="label-text">Location</span>
              </label>
              <input type="text" placeholder="Location" className="input input-bordered"  {...register("location", { required: true, maxLength: 30 })} />
              {errors.location && <p role="alert">{errors.location?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Condition</span>
              </label>
              <input type="text" placeholder="Product Condition" className="input input-bordered"  {...register("productcondition", { required: true, maxLength: 30 })} />
              {errors.productcondition && <p role="alert">{errors.productcondition?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Resell Price</span>
              </label>
              <input type="text" placeholder="Resell Price" className="input input-bordered"  {...register("resellprice", { required: true, maxLength: 30 })} />
              {errors.resellprice && <p role="alert">{errors.resellprice?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Original Price</span>
              </label>
              <input type="text" placeholder="originalprice" className="input input-bordered"  {...register("originalprice", { required: true, maxLength: 30 })} />
              {errors.originalprice && <p role="alert">{errors.originalprice?.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Years Of Used</span>
              </label>
              <input type="text" placeholder="yearsofused" className="input input-bordered"  {...register("yearsofused", { required: true, maxLength: 30 })} />
              {errors.yearsofused && <p role="alert">{errors.yearsofused?.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Posted Date</span>
              </label>
              <input type="text" placeholder="posteddate" defaultValue={date} readOnly className="input input-bordered"  {...register("posteddate", { required: true, maxLength: 30 })} />
              {errors.posteddate && <p role="alert">{errors.posteddate?.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Posted Time</span>
              </label>
              <input type="text" placeholder="postedtime" className="input input-bordered"  {...register("postedtime", { required: true, maxLength: 30 })} />
              {errors.postedtime && <p role="alert">{errors.postedtime?.message}</p>}
            </div>
         
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input type="file" placeholder="Photo" className="input input-bordered"  {...register("photo", { required: true, maxLength: 30 })} />
              {errors.photo && <p role="alert">{errors.photo?.message}</p>}
            </div>

            <div className="form-control mt-6 btn btn-info">
              <input type="submit" value='Submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default AddProducts;