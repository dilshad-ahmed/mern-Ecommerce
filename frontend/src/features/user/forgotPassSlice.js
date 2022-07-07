import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
    loading : true,
    message : '',
    success : '',
    error : '',
}

// forgot password action

export const forgotPassword = createAsyncThunk("forgotPassSlice/forgotPassword", async(userData, {rejectWithValue})=>{
    try{
        const config = {
            headers : { "Content-Type" : "application/json"},
            withCredentials: true ,credentials: "include"
        }
        
        const {data} = await axios.post(`/api/v1/password/forgot`, userData, config )
        return data
    } catch(error) {
        throw rejectWithValue(error.response.data)
    }
})

//reset password action 

export const resetPassword = createAsyncThunk("forgotPassSlice/resetPassword", async(userData, {rejectWithValue})=>{
    try{
        const {password, confirmPassword , token} = userData
        const config = { 
            headers : { "Content-Type" : "application/json" },
            withCredentials: true ,credentials: "include"
        }
        
        const {data} = await axios.put(`/api/v1/password/reset/${token}`, {password, confirmPassword}, config )
        return data

    }catch(error) {
        throw rejectWithValue(error.response.data)
    }
    
})

const forgotPassSlice = createSlice({
    name : "forgotPassword",
    initialState,
    reducers:{
        resetError : (state) => {
            state.error = ""
        },
        resetMessage : (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(forgotPassword.fulfilled, (state , action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = ''
        })
        builder.addCase(forgotPassword.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload.error;
        })

        // Reset password

        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resetPassword.fulfilled, (state , action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = ''
        })
        builder.addCase(resetPassword.rejected, (state , action) => {
            state.loading = false;
            state.message = "";
            state.error = action.payload.error;
        })
    }
})

export default forgotPassSlice.reducer;
export const {resetError, resetMessage} = forgotPassSlice.actions