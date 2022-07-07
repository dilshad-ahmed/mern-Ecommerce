import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    orders : [],
    error : '',
}

export const myAllOrders = createAsyncThunk('myOrders/myAllOrders', async() => {

    const config = { headers: {"Content-Type" : "application/json"}, withCredentials : true }
    const {data} = await axios.get("/api/v1/orders/me", config);
    return data.orders;
})

const myOrdersSlice = createSlice({
    name : "myOrders",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(myAllOrders.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(myAllOrders.fulfilled , (state , action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = ''
        })
        builder.addCase(myAllOrders.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default myOrdersSlice.reducer