import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    productDetails: [],
    error : '',
}

// Generates pending , fulfilled, and rejected action type
export const fetchProductDetails = createAsyncThunk('productDetails/fetchProductDetails',async (id)=>{
    const {data} = await axios.get(`/api/v1/product/${id}`);
    return data;
})

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductDetails.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.productDetails = action.payload
            state.error ='' 
        })
        builder.addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false
            state.productDetails=[]
            state.error = action.error.message
        })
    }
})

export default productDetailsSlice.reducer
