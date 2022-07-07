import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isDeleted : false,
    error : ""
}

export const deleteProductAdmin = createAsyncThunk( "deleteProduct/deleteProductAdmin" , async(id) => {

    const config = {headers : { "Content-Type" : "application/json"}, withCredentials : true}
    const {data} = await axios.delete(`/api/v1/product/${id}`, config)
    return data;
}) 

const deleteProductSlice = createSlice({
    name : 'deleteProduct',
    initialState,
    reducers : {
        deleteProductReset : (state) =>{
            state.isDeleted = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(deleteProductAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(deleteProductAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        })
        builder.addCase(deleteProductAdmin.rejected, (state , action) => {
            state.loading = false;
            state.error = action.error.message

        })
    } 
})

export default deleteProductSlice.reducer;
export const {deleteProductReset} = deleteProductSlice.actions;