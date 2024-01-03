import { createSlice } from "@reduxjs/toolkit";
const initalToken = localStorage.getItem('token');

const initialAuthState = {
    token:initalToken || '' ,
    
}
 
const authSlice = createSlice({
    name:'authentication',
    initialState : initialAuthState,
    reducers:{
        setToken(state,action){
            state.token = action.payload;
            localStorage.setItem('token',state.token);
            
        },
        logout(state){
            state.token='';
            
            localStorage.setItem('token',state.token);
            localStorage.removeItem('premium');
            console.log('hllo')
        },
        
    }
})
export default authSlice;