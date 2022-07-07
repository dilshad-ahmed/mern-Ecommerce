import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from '../../features/cart/cartSlice';
import { removeFromCart } from '../../features/cart/cartSlice'

const CartItemCard = () => {
  const dispatch = useDispatch();
  const { loading, cartItems, error } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) return

    dispatch(addToCart({id, quantity:newQuantity}))
  }
  
  const decreseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) return

    dispatch(addToCart({id, quantity:newQuantity}))
  }

  const deleteFromCart = (id) => {
    dispatch(removeFromCart(id))
    
  }

  useEffect(()=> {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  },[cartItems])
  

  return (
    <>
      <div className="container-md">
        {cartItems &&
          cartItems.map((item) => (
            <div className="card shadow-sm p-3 rounded mt-3" key={item.product}>
              <div className="row align-items-center">
                <div className="col-3">
                  <div className="cardimg">
                    <img src={item.image} alt="card" className="img-fluid " />
                  </div>
                </div>
                <div className="col-4">
                  <p> {item.name}</p>
                  <p>{item.price}</p>
                  <button onClick={() => deleteFromCart(item.product)} className="btn-outline-danger btn-sm"> Remove </button>
                </div>
                <div className="col-3 ">
                    <div className="d-flex">
                        <button onClick={() => decreseQuantity(item.product, item.quantity, item.stock)} className="btn btn-secondary btn-sm"> - </button>
                        <p className="px-3 py-2 m-0">{item.quantity}</p>
                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className="btn btn-secondary btn-sm" > + </button>
                    </div>
                </div>
                <div className="col-2">
                    <p>{item.quantity * item.price}</p>
                </div>

              </div>
            </div>
          ))}

      </div>
    </>
  );
};

export default CartItemCard;
