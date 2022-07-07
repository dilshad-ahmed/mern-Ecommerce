import React ,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import ProductCard from '../Home/ProductCard';
import {useLocation, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Product = () => {

  const {keyword} = useParams() 
  const {state} = useLocation()
  const [CurrentPageNo, setCurrentPageNo] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [price, setPrice] = useState([0,100000])


  let myobj = {keyword:(keyword ===undefined ?'':keyword),category:categoryFilter,page:CurrentPageNo,price}
  const dispatch = useDispatch();
  const {loading , products , productCount , resultPerPage ,category,  error} = useSelector((state)=> state.products)

  const handlePageChange = (e) => {
    setCurrentPageNo(e)
    console.log("page no ===> ",e)
  }
  
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice)
  }

  const keyUpHandler = () => {
    dispatch(fetchProducts(myobj))
    console.log("keyup handler api call")

  }

  useEffect(()=>{
    dispatch(fetchProducts(myobj))
    console.log("fetchproducts effect==>" ,myobj) 
  },[dispatch, keyword, CurrentPageNo, categoryFilter])

  useEffect(() => {
    if(state) {
      setCategoryFilter(state.category);
    }
  }, [state])
  

  return (
   <>
    <div className='text-center my-4'>
      <h3>Top Products</h3>
    </div>
    <div className="container-lg px-md-4 ">
      <div className="row">
        
        <div className="col-md-9 order-md-last">
          <div className='row gy-4'>

            {
              products && products.map(product => (
                <ProductCard key={product._id} product={product} />
              )
            )}
          
          </div>
        </div>

{/* filer and categories */}
        <div className="col-md-3 mt-4 mt-md-0">
          <div className="widget shadow position-sticky rounded-3 p-3" style={{top:"23px"}}>
            <h4> filter</h4>
              <div className="px-2">
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={price}
                  onChange={priceHandler}
                  onMouseUp ={keyUpHandler}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100000}
                />
              </div>
            <h4> categories</h4>
            <ul className='px-2'>
              {category && category.map((category,i) => (
                <li key={i} onClick={(e) => setCategoryFilter(category)} className="cursor-pointer mb-1 ">{category} </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

   {/* pagination start */}

      <div className='d-flex justify-content-center mt-5'>
        <Pagination
          activePage={CurrentPageNo}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          nextPageText='Next'
          prevPageText="Pre"
          itemClass='page-item'
          linkClass='page-link'
          activeClass=' active'

        />
      </div>

    </>
  )
}

export default Product;