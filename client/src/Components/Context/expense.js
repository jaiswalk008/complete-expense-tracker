import { createSlice } from "@reduxjs/toolkit";
import { expenseActions } from "./store";
import axios from "axios";

const isPremium = localStorage.getItem('premium');

const initialExpenseState ={
    expenseList:[],
    updateExpense:{},
    total:0,
    premium:isPremium || false,
}

const expenseSlice = createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state , action){
            state.expenseList.push(action.payload);
        },
        setExpenseList(state , action){
            state.expenseList=action.payload;
        },
        updateExpenseDetails(state, action) {
            state.updateExpense = state.expenseList.find(expense => expense._id === action.payload);
        },
        deleteExpense(state, action) {
            state.expenseList = state.expenseList.filter(expense =>{
                if( expense._id !== action.payload) return expense;
                else state.total = state.total-expense.amount;
            });
        },
        addTotal(state,action){
             
            state.total = +state.total + + action.payload;
        },
        resetTotal(state){
            state.total=0;
        },
        resetExpenseState: (state) => {
            state.expenseList = [];
            state.total = 0;
            state.premium=false;
        },
        setPremium(state){
            state.premium = true;
            
            localStorage.setItem('premium' , true);
        }
        
    }
})
export const fetchExpenseList = (token) =>{
    return async (dispatch) =>{
        const getExpenses =async () =>{
            const res = await axios.get(`http://localhost:4000/expense/getExpense`,{
                headers:{'Authorization':token}
            });
             
            if(res.data.expense){
                dispatch(expenseActions.resetTotal());
                res.data.expense.forEach((element) =>{
                    dispatch(expenseActions.addTotal(element.amount));
                })            
                dispatch(expenseActions.setExpenseList(res.data.expense));
                console.log('hello')
            }
            if(res.data.premium) dispatch(expenseActions.setPremium());
        }
        try {
           await getExpenses();
 
        } catch (error) {
            console.log(error);
        }
    }
}
export default expenseSlice;