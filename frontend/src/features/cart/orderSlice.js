import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    order : {},
    error : '',
}

export const createOrder = createAsyncThunk('order/createOrder', async({order}) => {

    const config = { headers: {"Content-Type" : "application/json"}, withCredentials : true }
    const {data} = await axios.post("/api/v1/order/new", order , config);
    return data;
})

const orderSlice = createSlice({
    name : "order",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(createOrder.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(createOrder.fulfilled , (state , action) => {
            state.loading = false;
            state.order = action.payload
        })
        builder.addCase(createOrder.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default orderSlice.reducer