import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isUpdated : false,
    error : ""
}

export const updateProductAdmin = createAsyncThunk( "updateProduct/updateProductAdmin" , async({id,productData}) => {

    const config = {headers : { "Content-Type" : "multipart/form-data"}, withCredentials : true}
    const {data} = await axios.put(`/api/v1/product/${id}`, 
        productData ,
        config    
    )
    return data;
    // .then((response)=> {console.log(response); return response.data} )
}) 

const updateProductSlice = createSlice({
    name : 'updateProduct',
    initialState,
    reducers : {
        updateProductReset : (state) =>{
            state.isUpdated = false;
        },
        resetError : (state) => {
            state.error = '';
        }
    },
    extraReducers : (builder) => {
        builder.addCase(updateProductAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(updateProductAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        })
        builder.addCase(updateProductAdmin.rejected, (state , action) => {
            state.error = action.error.message
            state.loading = false;
        })
    } 
})

export default updateProductSlice.reducer;
export const {updateProductReset, resetError} = updateProductSlice.actions;