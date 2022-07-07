import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isDeleted : false,
    error : ""
}

export const deleteOrderAdmin = createAsyncThunk( "deleteOrder/deleteOrderAdmin" , async(id) => {

    const config = {headers : { "Content-Type" : "application/json"}, withCredentials : true}
    const {data} = await axios.delete(`/api/v1/admin/order/${id}`, config)
    return data;
}) 

const deleteOrderSlice = createSlice({
    name : 'deleteOrder',
    initialState,
    reducers : {
        deleteOrderReset : (state) =>{
            state.isDeleted = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(deleteOrderAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(deleteOrderAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        })
        builder.addCase(deleteOrderAdmin.rejected, (state , action) => {
            state.loading = false;
            state.error = action.error.message

        })
    } 
})

export default deleteOrderSlice.reducer;
export const {deleteOrderReset} = deleteOrderSlice.actions;