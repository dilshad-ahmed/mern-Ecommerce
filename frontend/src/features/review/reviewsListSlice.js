import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    reviews : [],
    error : '',
}

export const getReviewsOfProduct = createAsyncThunk('productReviews/getReviewsOfProduct', async(id) => {

    const config = { headers: {"Content-Type" : "application/json"}, withCredentials : true }
    const {data} = await axios.get(`/api/v1/reviews?id=${id}`, config);
    return data;
})

const reviewListSlice = createSlice({
    name : "productReviews",
    initialState,
    reducers : {
        emptyReviewReset: (state) => {
            state.reviews = [];
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getReviewsOfProduct.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(getReviewsOfProduct.fulfilled , (state , action) => {
            state.loading = false;
            state.reviews = action.payload.reviews;
            state.error = ''
        })
        builder.addCase(getReviewsOfProduct.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default reviewListSlice.reducer
export const {emptyReviewReset} = reviewListSlice.actions 