import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isUpdated : false,
    error : ""
}

export const updateUserAdmin = createAsyncThunk( "updateUser/updateUserAdmin" , async({id,userData}) => {

    const config = {headers : { "Content-Type" : "application/json"}, withCredentials : true}
    const {data} = await axios.put(`/api/v1/admin/user/${id}`, 
        userData ,
        config    
    )
    return data;
    // .then((response)=> {console.log(response); return response.data} )
}) 

const updateUserSlice = createSlice({
    name : 'updateUser',
    initialState,
    reducers : {
        updateUserReset : (state) =>{
            state.isUpdated = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(updateUserAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(updateUserAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        })
        builder.addCase(updateUserAdmin.rejected, (state , action) => {
            state.error = action.error.message
            state.loading = false;
        })
    } 
})

export default updateUserSlice.reducer;
export const {updateUserReset} = updateUserSlice.actions;