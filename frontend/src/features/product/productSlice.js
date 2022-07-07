import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : false,
    productCount : 0,
    resultPerPage : 0,
    products: [],
    category:[],
    error : '',
}

// Generates pending , fulfilled, and rejected action type
export const fetchProducts = createAsyncThunk('product/fetchProducts',async({keyword="",category,page=1,price=[0,100000]}) =>{
    let link = `/api/v1/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    if (category){
        link = `/api/v1/products/?keyword=${keyword}&category=${category}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    } 
    const {data} = await axios.get(link);
    return data;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload.product
            state.productCount = action.payload.productCount
            state.resultPerPage = action.payload.resultPerPage
            state.category = action.payload.category
            state.error ='' 
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false
            state.products=[]
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer
