import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    mode:'light',
    pageStyle:{
        backgroundColor:"white",
        color:'black',
         
    },
    formStyle :{
        backgroundColor:"rgb(228, 222, 219)",
        color:'black',
    }

}
const themeSlice = createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        toggleTheme(state){
            if(state.mode==='light'){
                state.mode = 'dark';
                state.formStyle={
                    backgroundColor:"rgb(72 74 86)",
                    color:'white',
                }
                state.pageStyle={
                    backgroundColor:"#0e152b",
                    color:'white',
            
                }
            }
            else{
                state.mode = 'light';
                state.pageStyle =initialThemeState.pageStyle;
                state.formStyle  =initialThemeState.formStyle;
            }
            
        },
        resetThemeState: (state) => {
            state.mode = 'light';
            state.pageStyle = initialThemeState.pageStyle;
            state.formStyle = initialThemeState.formStyle;
        },
        
    }
})
export default themeSlice;