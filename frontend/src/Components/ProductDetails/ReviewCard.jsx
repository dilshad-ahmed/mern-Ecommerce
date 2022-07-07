import React from 'react'
import userImg from "../../Images/user-img.png"
import ReactStar from 'react-rating-stars-component'

const reviewCard = ({review}) => {

    const options ={
        edit:false,
        activeColor:"tomato",
        value:review.rating,
        isHalf:true,
        size: window.innerWidth < 600 ? 20 : 25,
      }

  return (
    <>
      <div className="col-md-4 col-sm-6 ">
        <div className=" card review-card d-flex  align-items-center text-center p-2">
          <img
            src={userImg}
            alt="user"
            className="rounded-pill pb-2"
            style={{ width: "40px" }}
          />
          {review.rating? <ReactStar {...options} /> : ""}
          <h3>{review.name && review.name}</h3>
          <p>{review.comment && review.comment}
          </p>
        </div>
      </div>
    </>
  );
}

export default reviewCard