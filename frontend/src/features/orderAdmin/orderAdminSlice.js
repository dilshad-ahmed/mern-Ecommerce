import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    orders : [],
    error : '',
}

export const getOrderList = createAsyncThunk('OrdersAdmin/getOrderList', async() => {

    const config = { headers: {"Content-Type" : "application/json"}, withCredentials : true }
    const {data} = await axios.get("/api/v1/admin/orders", config);
    return data.orders;
})

const orderAdminSlice = createSlice({
    name : "OrdersAdmin",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(getOrderList.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(getOrderList.fulfilled , (state , action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = ''
        })
        builder.addCase(getOrderList.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default orderAdminSlice.reducer