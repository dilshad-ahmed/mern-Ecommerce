import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    error : '',
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo"))   : {},
}

// Generates pending , fulfilled, and rejected action type
export const addToCart = createAsyncThunk('cart/addToCart',async ({id,quantity})=>{
    
    const {data} = await axios.get(`/api/v1/product/${id}`);
    const abc = {
        product : data.product._id,
        name : data.product.name,
        price : data.product.price,
        image : data.product.images[0].url,
        stock : data.product.stock,
        quantity
    }

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    return abc
})



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        removeFromCart : (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload)
        },
        clearCart : (state) => {
            state.cartItems = []
        },
        saveShippingInfo : (state, action) => {
            state.shippingInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            const item = action.payload;
            const isItemExist =  state.cartItems.find((i) => i.product ===  item.product
            )

            if(isItemExist){
                state.cartItems =  state.cartItems.map((i) => 
                    i.product ===  isItemExist.product ? item : i
                )
            }else {
                state.loading = false
                state.cartItems = [...state.cartItems, item]
                state.error = ''
            }

            // localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems))
 
        })
        builder.addCase(addToCart.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})


export default cartSlice.reducer
export const{ removeFromCart, clearCart, saveShippingInfo} = cartSlice.actions