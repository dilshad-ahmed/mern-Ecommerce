import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    success : false,
    newProduct : {},
    error : ""
}

export const createProductAdmin = createAsyncThunk( "createProduct/createProductAdmin" , async(productData) => {

    const config = {headers : { "Content-Type" : "multipart/form-data"}, withCredentials : true}
    return axios.post(`/api/v1/product/new`, 
        productData ,
        config    
    )
    .then((response)=> {console.log(response); return response.data} )
}) 

const createProductSlice = createSlice({
    name : 'createProduct',
    initialState,
    reducers : {
        newProductReset : (state) =>{
            state.success = false;
            state.newProduct = {};
        }
    },
    extraReducers : (builder) => {
        builder.addCase(createProductAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(createProductAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.newProduct = action.payload.product;
            state.error = '';
            state.success = action.payload.success;
        })
        builder.addCase(createProductAdmin.rejected, (state , action) => {
            state.error = action.error.message
        })
    } 
})

export default createProductSlice.reducer;
export const {newProductReset} = createProductSlice.actions;