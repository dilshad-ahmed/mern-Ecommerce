import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { config } from 'dotenv';

const initialState = {
    loading : true,
    success: '',
    error : '',
}

// Generates pending , fulfilled, and rejected action type
export const reviewPost = createAsyncThunk('review/reviewPost',async (review)=>{
    config ={ headers : 
        {
        "Content-Type" : "application/json" 
        }, withCredentials : true }
    const {data} = await axios.put(`/api/v1/review`, review, config);
    return data.success;
})

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers : {
        reviewReset : (state) =>{
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(reviewPost.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(reviewPost.fulfilled,(state,action)=>{
            state.loading = false
            state.success = action.payload
            state.error ='' 
        })
        builder.addCase(reviewPost.rejected,(state,action)=>{
            state.loading=false
            state.error = action.error.message
        })
    }
})

export default reviewSlice.reducer;
export const { reviewReset } = reviewSlice.actions;
