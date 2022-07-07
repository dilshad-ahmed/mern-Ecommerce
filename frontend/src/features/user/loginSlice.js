import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading : true,
    isAuthenticated : '',
    user : {},
    error : null
}

//login actions
export const fetchLogin = createAsyncThunk( "login/fetchLogin" , async({email,password},{rejectWithValue}) => {

    // const config = {headers : { "Content-Type" : "application/json"},withCredentials : true }
    // return axios
    // .post(`/api/v1/login`, 
    //     {email, password} ,
    //     config    
    // )
    // .then((response)=> {console.log(response); return response.data} )

    try{
        const config = {headers : { "Content-Type" : "application/json"},withCredentials : true }
        const {data} = await axios.post(`/api/v1/login`, {email, password}, config)
        return data
       
    }catch(error){
        console.log(error)
        throw rejectWithValue(error.response.data)
    }
}) 

//load user
export const loadUser = createAsyncThunk( "login/loadUser" , async(a,{rejectWithValue}) => {
    
    try{
        const {data} = await axios.get(`/api/v1/me`, {withCredentials: true ,credentials: "include"})
        return data
       
    }catch(error){
        throw rejectWithValue(error.response.data)
    }
}) 

// logout user
export const logoutUser = createAsyncThunk( "login/logoutUser" , async() => {
    return axios
    .get(`/api/v1/logout`, { withCredentials: true ,credentials: "include"}
    // credentials: 'include'
    )
    .then((response)=> {console.log("loaud user response===>",response);
    localStorage.removeItem("cartItems");
    return response.data
    } )
})


const loginSlice = createSlice({
    name : 'login',
    initialState,
    // reducers : {
    //     logoutUser : (state) => {
    //         state.loading = false;
    //         state.isAuthenticated = false;
    //         state.user = null;
    //     }
    // } ,
    reducers: {
        clearLoginError : (state) =>{
            state.error = ''
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchLogin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchLogin.fulfilled , (state , action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = ''
        })
        builder.addCase(fetchLogin.rejected, (state , action) => {
            state.error = action.payload.error
        })
//load user
        builder.addCase(loadUser.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(loadUser.fulfilled , (state , action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = ''
        })
        builder.addCase(loadUser.rejected, (state , action) => {
            state.error = ''
            state.isAuthenticated = false
        })

//logut user
        builder.addCase(logoutUser.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled , (state , action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = ''
        })
        builder.addCase(logoutUser.rejected, (state , action) => {
            state.error = ""
        })

    } 
})

export default loginSlice.reducer;
export const {clearLoginError} = loginSlice.actions;
