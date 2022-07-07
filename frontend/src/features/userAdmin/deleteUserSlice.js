import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isDeleted : false,
    error : ""
}

export const deleteUserAdmin = createAsyncThunk( "deleteUser/deleteUserAdmin" , async(id) => {

    const config = {headers : { "Content-Type" : "application/json"}, withCredentials : true}
    const {data} = await axios.delete(`/api/v1/admin/user/${id}`, config)
    return data;
}) 

const deleteUserSlice = createSlice({
    name : 'deleteUser',
    initialState,
    reducers : {
        deleteUserReset : (state) =>{
            state.isDeleted = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(deleteUserAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(deleteUserAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        })
        builder.addCase(deleteUserAdmin.rejected, (state , action) => {
            state.loading = false;
            state.error = action.error.message

        })
    } 
})

export default deleteUserSlice.reducer;
export const {deleteUserReset} = deleteUserSlice.actions;