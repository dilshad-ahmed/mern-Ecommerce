import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isDeleted : false,
    error : ""
}

export const deleteReviewAdmin = createAsyncThunk( "deleteOrder/deleteReviewAdmin" , async({reviewId, productId}) => {

    const config = {headers : { "Content-Type" : "application/json"}, withCredentials : true}
    const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`, config)
    return data;
}) 

const deleteReviewSlice = createSlice({
    name : 'deleteOrder',
    initialState,
    reducers : {
        deleteReviewReset : (state) =>{
            state.isDeleted = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(deleteReviewAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(deleteReviewAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        })
        builder.addCase(deleteReviewAdmin.rejected, (state , action) => {
            state.loading = false;
            state.error = action.error.message

        })
    } 
})

export default deleteReviewSlice.reducer;
export const {deleteReviewReset} = deleteReviewSlice.actions;