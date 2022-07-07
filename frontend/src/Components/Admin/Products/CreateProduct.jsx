import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { createProductAdmin , newProductReset} from '../../../features/product/createProductSlice'
import Sidebar from '../Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import {toast} from 'react-toastify';

const CreateProduct = () => {
    // const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success} = useSelector((state) => state.newProduct);
    const { categories } = useSelector((state) => state.adminProducts)

    const [fullView, setFullView] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("name", name);
        myform.set("price", price);
        myform.set("description", description);
        myform.set("category", category);
        myform.set("stock", stock);
        images.forEach((image) => {
            myform.append("images", image)
        })

        dispatch(createProductAdmin(myform));
    }

    const createProductImagesChange = (e) => {
        const files =   Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result])
                    setImages((old) => [...old, reader.result])
                }
            }

            reader.readAsDataURL(file);
        })
    }

    useEffect(()=> {
        if(error){
          toast.error(error);
        }
        if(success) {
            toast("product created successfully");
            navigate("/admin/dashboard");
            dispatch(newProductReset());
        }

    },[dispatch, success, error])

  return (
    <>
        <div className="container-fluid vh-80">
        <div className='row'>
          <div className={fullView ? 'd-none' : 'col-lg-2 col-3 border-end vh-80 pt-5 text-white bg-dark '}>
            <Sidebar/>
          </div>
          
          <div className={fullView ? 'col-12' : 'col-lg-10 col-9'}>
              <div className="header">
                <div className='d-flex justify-content-between align-items-center py-2'>
                <IconButton  onClick={(e) => setFullView(!fullView ? true : false)} aria-label="menu" >
                  <MenuIcon  fontSize="inherit"/>
                </IconButton>
                  <h3 className='text-center'> Create product</h3>
                </div>
                <div className=" d-flex justify-content-center align-items-center">
                    <div className="reg-container">
                    <div className='modal-size-reg'> 
                        <div>
                        <h5 className='text-center mb-3 text-muted  '>Create New Product</h5>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={name} onChange={(e) => setName(e.target.value)}  type="text" className="form-control form-control-modify" name="name" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                                        <label htmlFor="c1" className="input-text"> Name</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-6">
                                    <div className="form-group">
                                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control form-control-modify" name="price" placeholder=' '  autoComplete="off"  required />
                                        <label htmlFor="c3" className="input-text">Price</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" className="form-control form-control-modify" name="stock" placeholder=' '  autoComplete="off"  required />
                                        <label htmlFor="c4" className="input-text">Stock</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-6">
                                    <div className="form-group">
                                        <select  onChange={(e) => setCategory(e.target.value)} className="form-control form-control-modify" id="exampleFormControlSelect1">
                                        <option className='disabled' value="">Select Category</option>
                                        {   
                                            categories && categories.map((item) => (
                                                <option key={item} value={item}> {item} </option>

                                            ))
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <input value={category} onChange={(e) => setCategory(e.target.value)}  type="text" className="form-control form-control-modify" name="category" placeholder=' '  autoComplete="off" required />
                                        <label className="input-text"> new Category</label>
                                    </div>      
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control form-control-modify" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>

                            <div className="form-group d-flex">
                                <input  onChange={createProductImagesChange} accept="image/*" multiple type="file" className=" form-control form-control-modify" name="avtar" required   />
                                {/* <label htmlFor="c3" className="input-text">upload</label> */}
                            </div>
                            <div className='image-preview'>
                                {
                                    imagesPreview.map((item,i) => (
                                        <img key={i} src={item} height="35" alt="avtar-preview" className='px-3 '></img>    
                                    ))
                                }
                            </div>

                            <div className='d-flex justify-content-between mt-2'>
                                <button type='submit' className='btn btn2 w-100 '> Create</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>

                {/* //create product end */}


              </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default CreateProduct