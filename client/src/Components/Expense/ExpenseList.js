import './Expense.css';
import ExpenseCard from './ExpenseCard';   
import { useSelector, useDispatch } from 'react-redux'; 
import { authActions } from '../Context/store';
const ExpenseList = (props) => {
    const dispatch = useDispatch();
    
 
    return(
        <div className="container mb-2">
            <div className='d-flex'>
                <div className='w-50'>
                    <h1 className="text-left">My Expenses</h1>  
                    <h5 className='text-secondary '>Total Expenses - {props.total}</h5>
                </div>
               
               
            </div>
            <div className="expenses-container">
                {props.expenseList.map((expense) =>{
                    
                    return <ExpenseCard key={expense._id} id={expense._id} amount={expense.amount}
                    category={expense.category} expenseName= {expense.expenseName} description={expense.description} />
                })}
            </div>
        </div>
    )
}
export default ExpenseList;