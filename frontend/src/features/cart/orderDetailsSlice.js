import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    order : {},
    error : '',
}

export const getOrderDetails = createAsyncThunk('orderDetails/getOrderDetails', async({id}) => {

    const config = { withCredentials : true }
    const {data} = await axios.get(`/api/v1/order/${id}`, config);
    return data.order;
})

const orderDetailsSlice = createSlice({
    name : "orderDetails",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(getOrderDetails.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(getOrderDetails.fulfilled , (state , action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = ''
        })
        builder.addCase(getOrderDetails.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default orderDetailsSlice.reducer