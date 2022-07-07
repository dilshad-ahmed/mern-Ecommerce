import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    products: [],
    categories:[],
    error : '',
}

// Generates pending , fulfilled, and rejected action type
export const fetchAdminProducts = createAsyncThunk('adminProducts/fetchAdminProducts',async() =>{
    const config = {
        headers : {
            "Content-Type" : "application/json"
        },
        withCredetials : true
    }
    const {data} = await axios.get(`/api/v1/admin/products`, config);
    return data;
})

const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAdminProducts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload.products;
            state.error ='' 
            state.categories = action.payload.categories;
        })
        builder.addCase(fetchAdminProducts.rejected,(state,action)=>{
            state.loading=false
            state.products=[]
            state.error = action.error.message
        })
    }
})

export default adminProductSlice.reducer
