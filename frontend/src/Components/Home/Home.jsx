import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/product/productSlice'
import ProductCard from './ProductCard'
import Banner from './Banner'


const Home = () => {


  const dispatch = useDispatch();
  const {loading , products , error} = useSelector((state)=> state.products)
  
  const myobj = {keyword:'',page:1}
  useEffect(()=>{
      dispatch(fetchProducts(myobj))
  },[dispatch])

  return (
    <>
    <Banner/>
    <div className='text-center my-4 position-relative'>
      <h3 className='heading-top'>Top Products</h3>
    </div>
    <div className="container mb-3">
      <div className='row gy-4'>
        {
          products && products.map(product => (
            <ProductCard key={product._id} product={product } />
          )
        )}
      </div>
    </div>
    </>
  )
}

export default Home