import React from 'react'
import {Link} from 'react-router-dom'
import ReactStar from 'react-rating-stars-component'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProductCard = ({product}) => {
  
  
  const options ={
    edit:false,
    activeColor:"tomato",
    value: product.ratings,
    isHalf:true,
    size: window.innerWidth < 600 ? 20 : 25,
  }
  
  
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-4 ">
        <Link className='text-black text-decoration-none' to={`/product/${product._id}`}>
          <div className="card product-card shadow-sm border-0 p-2">
            { product.images.length > 0 ? <img src={product.images[0].url} alt={product.name} /> : <Skeleton height={210}/> }
            <div className='py-2 px-4'>
              <h4>{product.name || <Skeleton/>}</h4>
              <div className='d-flex align-items-center justify-content-between'>
                {<ReactStar {...options}> </ReactStar> || <Skeleton />} <span className='text-black'> {product.numOfReviews || "0"} reviews</span>
              </div>
              <p className='m-0'> &#8377;{product.price || <Skeleton/>}/</p>
              
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductCard