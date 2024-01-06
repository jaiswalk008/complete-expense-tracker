
import './Expense.css';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { useSelector } from 'react-redux';

import Header from '../UI/Header';

const Expense = () =>{
    const {expenseList , total} = useSelector((state) => state.expense);
    return (
        <>
            <Header/>
            <ExpenseForm/>
            <ExpenseList total={total} expenseList={expenseList}/>
        </>
    )
}
export default Expense;