import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'

const FooterView = () => {

  const {category} = useSelector((state)=> state.products)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [cat, setCat] = useState("")

  const footerCatHandler = (cate) =>{
    // dispatch(fetchProducts(category));
    console.log(cate)
    navigate(`/products`,{state:{category:cate}})
  }
  

  return (
    <>
      <footer >
        <div className="footer p-sm-5 p-2 text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 mb-3 mb-md-0">
                <h2> Ecommerce Store</h2>
                <p>Address : Noida sector-15 , India </p>
                <p>mobile no : <a href="tel:8318639067" className='text-decoration-none text-white'>8318639067</a> </p>
                <p>Email : <a href="mailto:1002dilshad@gmail.com" className='text-decoration-none text-white'>1002dilshad@gmail.com</a> </p>
              </div>
              <div className='col-md-2'></div>
              <div className="col-md-3 col-6">
                <h5>categories</h5>
                <ul>
                  {
                    category && category.map((cate,i) => (
                      <li key={i} onClick={()=>footerCatHandler(cate)}>{cate}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="col-md-3 col-6">
              <h5>Some Links</h5>
                <ul>
                  {/* <Link to="/cart"> your cart</Link> */}
                  <li> <a href="http://dilshad.tech/" className='text-decoration-none text-white' title="Know more about Dilshad" >www.dilshad.tech</a> </li> 
                  <li><a href="https://api.whatsapp.com/send?phone=8318639067" className='text-decoration-none text-white' title="Say hii to Dilshad.. " >Send Message</a> </li>

                  
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-light small footer p-2">copyright &copy; 2022 : Developed & Design By <a href='http://dilshad.tech/ ' className='text-decoration-none text-white'> Dilshad</a> </div>
      </footer>
    </>
  )
}

export default FooterView