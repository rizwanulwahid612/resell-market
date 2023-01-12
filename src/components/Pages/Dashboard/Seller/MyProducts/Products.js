import React from 'react';

const Products = ({handleAdvitiseProduct,handleDeleteAdvitiseProduct,handleDelete,myproducts}) => {
    
    return (
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 g-4 ml-6'>
              {myproducts &&
        myproducts?.map(addedProduct => <div key={addedProduct?._id} className="card w-80 bg-base-100 shadow-xl mt-6 mb-6">
          <figure><img className='h-56' src={addedProduct?.image} alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              {addedProduct?.name}
              <div className="badge badge-secondary">{addedProduct?.brand}</div>
            </h2>
            <p>Product's id: {addedProduct?.productid}</p>
            <p>Posted Date: {addedProduct?.posteddate}</p>
            <p>Posted Time: {addedProduct?.postedtime}</p>
            <p>Resell Price: {addedProduct?.resellprice}</p>
            <p>Original Price: {addedProduct?.originalprice}</p>
            <p>Seller Name: {addedProduct?.sellername}</p>
            <p>Seller Email: {addedProduct?.selleremail}</p>
            <p>Seller Location: {addedProduct?.location}</p>
            <p>Years Of Used: {addedProduct?.yearsofused}</p>
            <div className="card-actions justify-center">
              <button onClick={() => handleDelete(addedProduct)} className="btn btn-sm btn-secondary">Delete Product</button>

              <button onClick={() => handleDeleteAdvitiseProduct(addedProduct)} className="btn btn-sm btn-error">Delete Advitise</button>

              <button onClick={() => handleAdvitiseProduct(addedProduct)} className="btn btn-sm btn-info">Make Advitise</button>



            </div>
          </div>
        </div>)
      }
        </div>
    );
};

export default Products;