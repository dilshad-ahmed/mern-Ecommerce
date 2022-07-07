import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../../features/product/productDetailsSlice";
import ReactStar from "react-rating-stars-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReviewCard from "./ReviewCard";
import { addToCart } from "../../features/cart/cartSlice";
import { reviewPost, reviewReset } from "../../features/review/reviewSlice";
import { toast } from "react-toastify";
import Carousel from "react-material-ui-carousel";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import { Rating } from "@mui/material";

const ProductDetails = () => {
    const { id } = useParams();

    // review states

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const { loading, productDetails, error } = useSelector(
        (state) => state.productDetails
    );
    const { product } = useSelector(
        (state) => state.productDetails.productDetails
    );
    const { success } = useSelector((state) => state.review);
    const { cartItems } = useSelector((state) => state.cart);
    // const product = productDetails.product
    // console.log(productsArray)

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
        },
    ];

    const options = {
        edit: false,
        activeColor: "tomato",
        value: loading ? 0 : product && product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    };

    // increment decrement
    const [productQuantity, setProductQuantity] = useState(1);

    const incrementQuantity = () => {
        if (product.stock <= productQuantity) return;

        let newQuantity = productQuantity + 1;
        setProductQuantity(newQuantity);
    };
    const decrementQuantity = () => {
        if (1 >= productQuantity) return;

        let newQuantity = productQuantity - 1;
        setProductQuantity(newQuantity);
    };

    //cart handler
    const addCartHandler = () => {
        dispatch(addToCart({ id: id, quantity: productQuantity }));
        toast("Item added to cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const review = {
            comment: comment,
            rating: rating,
            productId: id,
        };
        dispatch(reviewPost(review));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        dispatch(fetchProductDetails(id));

        if (success) {
            toast("review added");
            dispatch(reviewReset());
        }
    }, [dispatch, id, success, error]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card carousel-card">
                            {/* { product && product.images[0] ? <img src={product.images[0].url} alt={product.name} /> : <Skeleton height={180}/> }  */}
                            <Carousel>
                                {product &&
                                    product.images.map((item, i) => (
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} slide`}
                                            className="product-slide-img "
                                        />
                                    ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="productDetail p-2 px-md-5 py-md-2">
                            <h3>
                                {loading ? (
                                    <Skeleton />
                                ) : (
                                    product && product.name
                                )}
                            </h3>
                            <p className="0">
                                {" "}
                                #id:
                                {loading ? (
                                    <Skeleton />
                                ) : (
                                    product && product._id
                                )}
                            </p>
                            <div>
                                <div className="d-flex align-items-center justify-content-between">
                                    {loading ? "" : <ReactStar {...options} />}{" "}
                                    <span className="text-black">
                                        {" "}
                                        {loading ? (
                                            <Skeleton />
                                        ) : (
                                            product && product.numOfReviews
                                        )}{" "}
                                        reviews
                                    </span>
                                </div>
                                <div className="d-flex">
                                    <button
                                        onClick={decrementQuantity}
                                        className="btn btn-primary">
                                        {" "}
                                        -{" "}
                                    </button>
                                    <span className="quantity px-3 py-2">
                                        {" "}
                                        {productQuantity}
                                    </span>
                                    <button
                                        onClick={incrementQuantity}
                                        className="btn btn-primary">
                                        {" "}
                                        +{" "}
                                    </button>
                                </div>
                                {loading ? (
                                    <Skeleton />
                                ) : (
                                    <button
                                        onClick={addCartHandler}
                                        disabled={
                                            product && product.stock < 1
                                                ? true
                                                : false
                                        }
                                        className="btn btn-dark my-3">
                                        {" "}
                                        Add to Cart
                                    </button>
                                )}
                                <div className="status">
                                    {loading ? (
                                        <Skeleton />
                                    ) : (
                                        <p>
                                            {" "}
                                            status :{" "}
                                            {product && product.stock < 1
                                                ? "out of stock"
                                                : "in stock"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="productDesc">
                                <p>
                                    {" "}
                                    <span className="fw-bold px-2">
                                        {" "}
                                        Description :{" "}
                                    </span>
                                    {loading ? (
                                        <Skeleton />
                                    ) : (
                                        product && product.description
                                    )}
                                </p>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={submitReviewToggle}>
                                {" "}
                                Add Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review toggle start */}
            <Dialog
                aria-labelledby="dialog title"
                open={open}
                onClose={submitReviewToggle}>
                <DialogTitle> Submit Review</DialogTitle>
                <DialogContent className="submit-dialog d-flex flex-column pb-2">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="dialog-text-area mt-2 px-2"
                        cols="30"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}></textarea>
                </DialogContent>

                <DialogActions>
                    <Button color="secondary" onClick={submitReviewToggle}>
                        {" "}
                        Cancel{" "}
                    </Button>
                    <Button onClick={reviewSubmitHandler}> Submit </Button>
                </DialogActions>
            </Dialog>
            {/* Review toggle end  */}

            <div className="review my-5">
                <h3 className="text-center  pb-3"> Review</h3>
                <div className="container">
                    <div className="row">
                        {loading ? (
                            <Skeleton />
                        ) : product && product.reviews[0] ? (
                            product.reviews.map((review, i) => (
                                <ReviewCard key={i} review={review} />
                            ))
                        ) : (
                            "no review"
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
