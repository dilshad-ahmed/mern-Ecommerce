import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading : true,
    users : [],
    error : '',
}

export const getUsersList = createAsyncThunk('usersList/getUsersList', async() => {

    const config = { headers: {"Content-Type" : "application/json"}, withCredentials : true }
    const {data} = await axios.get("/api/v1/admin/users", config);
    return data.users;
})

const userListSlice = createSlice({
    name : "usersList",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(getUsersList.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(getUsersList.fulfilled , (state , action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = ''
        })
        builder.addCase(getUsersList.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default userListSlice.reducer