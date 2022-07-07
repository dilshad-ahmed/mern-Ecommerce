import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { emptyReviewReset, getReviewsOfProduct } from '../../../features/review/reviewsListSlice'
import { deleteReviewAdmin, deleteReviewReset } from '../../../features/review/deleteReviewSlice'

import { DataGrid } from '@mui/x-data-grid'
import Sidebar from '../Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const Reviews = () => {

  const [fullView, setFullView] = useState(false)
  const [productId, setProductId] = useState('')


  const {loading, reviews, error} = useSelector((state) => state.productReviews)
  const { isDeleted , error:deleteError} = useSelector((state) => state.deleteReview)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteReviewHandler = (id) =>{
    console.log(id)
    dispatch(deleteReviewAdmin({reviewId:id, productId}));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getReviewsOfProduct(productId))

  }

  const columns = [
    {
      field : "id",
      headerName : "Review Id",
      minWidth : 180,
      flex : 1,
    },
    {
        field : "comment",
        headerName : "Comment",
        flex : 1,
    },
    {
        field : "name",
        headerName : "Name",
        flex : 1,
        minWidth : 80,
    },
    {
        field : "rating",
        headerName : "Rating",
        type : "number",
        flex : 1,
    },
    {
      field : "action" ,
      headerName : "Actions",
      sortable : "false",
      minWidth : 100, 
      renderCell : (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon/>
            </Button>
          </>
        )
      }
    },
    
  ]

  const rows =[]

  reviews && reviews.forEach((item) =>{
    rows.push({
      id : item._id,
      rating : item.rating,
      comment : item.comment,
      name : item.name,

    })
  })

  // console.log(rows)



useEffect(()=> {
  if(productId.length===24){
    dispatch(getReviewsOfProduct(productId))

  }

  if(isDeleted) {
    navigate("/admin/reviews");
    alert("reviews deleted successfully")
    dispatch(deleteReviewReset());
  }

},[dispatch,isDeleted, navigate, productId])

  return (
    <div className="container-fluid ">
        <div className='row'>
          <div className={fullView ? 'd-none' : 'col-lg-2 col-3 border-end  pt-5 text-white bg-dark '}>
            <Sidebar/>
          </div>
          
          <div className={fullView ? 'col-12' : 'col-lg-10 col-9'}>
              <div className="header">
                <div className='d-flex justify-content-between align-items-center py-2'>
                  <IconButton onClick={(e) => setFullView(!fullView ? true : false)} aria-label="menu" >
                    <MenuIcon  fontSize="inherit" />
                  </IconButton>
                  <h3 className='text-center'> Reviews</h3>
                </div>

                {/* review Form start */}
                <div className=" d-flex justify-content-center align-items-center">
                  <div className="reg-container mb-4">
                    <div className='modal-size-reg'> 
                        <div>
                        <h5 className='text-center mb-3 text-muted  '> Enter Product Id</h5>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={productId} onChange={(e) => setProductId(e.target.value)}  type="text" className="form-control form-control-modify" name="name" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                                        <label htmlFor="c1" className="input-text"> product id</label>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <button type='submit' disabled={loading ? true : false || productId === "" ? true : false} className='btn btn2 '> Search </button>
                            </div>
                        </form>
                    </div>
                  </div>
                </div>
                    
                {/* review Form end */}
                {
                  reviews && reviews.length > 0 ?
                  (
                    <div className=' vh-80'> 
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        disableSelectionOnClick
                      />
                    </div>
                  ) : ( <h3 className="text-center my-5"> no reviews</h3>)
                }
              </div>
          </div>
        </div>
      </div>
  )
}

export default Reviews