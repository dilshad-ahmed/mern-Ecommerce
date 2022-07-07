import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    user : {},
    error : '',
}

export const getUserDetails = createAsyncThunk('userDetails/getUserDetails', async(id) => {

    const config = { headers: {"Content-Type" : "application/json"}, withCredentials : true }
    const {data} = await axios.get(`/api/v1/admin/user/${id}`, config);
    return data.user;
})

const userDetailsSlice = createSlice({
    name : "userDetails",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(getUserDetails.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(getUserDetails.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = ''
        })
        builder.addCase(getUserDetails.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default userDetailsSlice.reducer