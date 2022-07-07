import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isUpdated : false,
    error : ""
}

export const updateOrderAdmin = createAsyncThunk( "updateOrder/updateOrderAdmin" , async({id,productData}) => {

    const config = {headers : { "Content-Type" : "application/json"}, withCredentials : true}
    const {data} = await axios.put(`/api/v1/admin/order/${id}`, 
        productData ,
        config    
    )
    return data;
    // .then((response)=> {console.log(response); return response.data} )
}) 

const updateOrderSlice = createSlice({
    name : 'updateOrder',
    initialState,
    reducers : {
        updateOrderReset : (state) =>{
            state.isUpdated = false;
        },
        resetError : (state) => {
            state.error = ''
        }
    },
    extraReducers : (builder) => {
        builder.addCase(updateOrderAdmin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(updateOrderAdmin.fulfilled , (state , action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        })
        builder.addCase(updateOrderAdmin.rejected, (state , action) => {
            state.error = action.error.message
            state.loading = false;
        })
    } 
})

export default updateOrderSlice.reducer;
export const {updateOrderReset, resetError} = updateOrderSlice.actions;