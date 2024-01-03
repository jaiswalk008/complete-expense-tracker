import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Context/auth';
import expenseSlice from "./expense";
// import themeslice from './theme';
import themeSlice from "./theme";
export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:expenseSlice.reducer,
        theme:themeSlice.reducer,
    }
})
export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
export const themeActions = themeSlice.actions;