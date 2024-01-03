import axios from 'axios'
import './Expense.css'
import { useDispatch, useSelector  } from 'react-redux'
import {expenseActions} from '../Context/store';
// import useEmail from '../Helpers/useEmail';
const ExpenseCard = (props) =>{
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {total} = useSelector(state => state.expense);
    
    // const email = useEmail();
    const editExpense = (id) =>{
        console.log(id)
        dispatch(expenseActions.updateExpenseDetails(id));
        
        dispatch(expenseActions.deleteExpense(id));

    }
    const deleteExpense = async (id) =>{
        try {
            await axios.delete(`http://localhost:4000/expense/deleteExpense/${id}?total=${total}`,
            {headers: {'Authorization':token}});
            dispatch(expenseActions.deleteExpense(id));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="expense-card" id={props._id}>
            <nav className='navbar '>{props.category}</nav>
                <div className='d-flex m-2'>
                    <div className='me-2'>
                        <h4>{props.expenseName}</h4>
                        <h6 className='text-secondary'>{props.description}</h6>

                    </div>
                    <div>
                        <strong  className='m-2 amount'>Rs. {props.amount}</strong>
                    </div>
                    </div>
                    <div className='float-end m-2'>
                        <button onClick={() => editExpense(props.id) } className='btn btn-danger me-1'>Edit</button>
                        <button onClick={() => deleteExpense(props.id)} className='btn-dark btn'>Delete</button>
                    </div>
                </div>
    )
}
export default ExpenseCard;