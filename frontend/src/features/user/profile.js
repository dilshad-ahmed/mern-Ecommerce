import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isUpdated : false,
    error : ""
}

export const updateUser = createAsyncThunk( "profile/updateUser" , async(userData,{rejectWithValue}) => {
    try{
        const config = {
            headers : { "Content-Type" : "multipart/form-data"},
            withCredentials: true ,
            credentials: "include"
        }
        
        const {data} = await axios.put(`/api/v1/me/update`, userData, config );
        return data

    }catch(error) {
        throw rejectWithValue(error.response.data);
    }
    
}) 

//update password
export const updatePassword = createAsyncThunk( "profile/updatePassword" , async(userData, {rejectWithValue}) => {
    try{
        const config = {headers : { "Content-Type" : "application/json"},
        withCredentials: true ,credentials: "include"}
        
        const {data} = await axios.put(`/api/v1/password/update`, userData, config )
        return data
    } catch(error) {
        throw rejectWithValue(error.response.data)
    }
}) 

const updateSlice = createSlice({
    name : 'profile',
    initialState,
    reducers : {
        profileReset : (state) => {
            state.isUpdated = false;
        },
        resetError : (state) => {
            state.error = "";
        },
    },
    extraReducers : (builder) => {
        builder.addCase(updateUser.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled , (state , action) => {
            state.loading = false;
            state.isUpdated = true;
            // state.user = action.payload.user;
            state.error = ''
        })
        builder.addCase(updateUser.rejected, (state , action) => {
            state.error = action.payload.error
        })

        //update password

        builder.addCase(updatePassword.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(updatePassword.fulfilled , (state , action) => {
            state.loading = false;
            state.isUpdated = true;
            // state.user = action.payload.user;
            
        })
        builder.addCase(updatePassword.rejected, (state , action) => {
            state.error = action.payload.error
        })
    } 
})

export default updateSlice.reducer;
export const { profileReset , resetError} = updateSlice.actions