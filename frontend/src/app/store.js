import {configureStore, createReducer} from "@reduxjs/toolkit"
import productReducer from '../features/product/productSlice'
import productDetailsReducer from '../features/product/productDetailsSlice'
import loginReducer from '../features/user/loginSlice'
import registerReducer from "../features/user/registerSlice"
import updateReducer from "../features/user/profile"
import forgotPassReducers from '../features/user/forgotPassSlice'
import cartReducer from '../features/cart/cartSlice'
import orderSlice from "../features/cart/orderSlice"
import myOrdersSlice from "../features/cart/myOrdersSlice"
import orderDetailsSlice from "../features/cart/orderDetailsSlice"
import reviewSlice from "../features/review/reviewSlice"
import adminProductSlice from "../features/product/adminProductSlice"
import createProductSlice from "../features/product/createProductSlice"
import deleteProductSlice from "../features/product/deleteProductSlice"
import updateProductSlice from "../features/product/updateProductSlice"
import orderAdminSlice from "../features/orderAdmin/orderAdminSlice"
import deleteOrderSlice from "../features/orderAdmin/deleteOrderSlice"
import updateOrderSlice from "../features/orderAdmin/updateOrderSlice"
import userListSlice from "../features/userAdmin/userListSlice"
import updateUserSlice from "../features/userAdmin/updateUserSlice"
import userDetailsSlice from "../features/userAdmin/userDetailsSlice"
import deleteUserSlice from "../features/userAdmin/deleteUserSlice"
import reviewsListSlice from "../features/review/reviewsListSlice"
import deleteReviewSlice from "../features/review/deleteReviewSlice"

const store = configureStore({
    reducer:{
        products: productReducer,
        productDetails: productDetailsReducer,
        login: loginReducer,
        register: registerReducer,
        profile : updateReducer,
        forgotPass : forgotPassReducers,
        cart : cartReducer,
        order : orderSlice,
        myOrders : myOrdersSlice,
        orderDetails : orderDetailsSlice,
        review : reviewSlice,
        adminProducts : adminProductSlice,
        newProduct : createProductSlice,
        deleteProduct : deleteProductSlice,
        updateProduct : updateProductSlice,
        allOrders : orderAdminSlice,
        deleteOrder : deleteOrderSlice,
        updateOrder : updateOrderSlice,
        userList : userListSlice,
        userDetails : userDetailsSlice,
        updateUser : updateUserSlice,
        deleteUser : deleteUserSlice,
        productReviews : reviewsListSlice,
        deleteReview : deleteReviewSlice,
        
    }
})

export default store;