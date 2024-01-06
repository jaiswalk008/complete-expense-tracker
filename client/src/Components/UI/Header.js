import '../Expense/Expense.css';
import { useDispatch , useSelector} from 'react-redux';
import { themeActions , expenseActions } from '../Context/store';
import generateCSV from '../Expense/generateCSV';
// import rzpTransaction from '../Helpers/razorPay';
import { useCallback } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
const Header = (props) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {mode} = useSelector(state => state.theme);
    // const {token} = useSelector(state => state.auth);
    const {premium, expenseList,total} = useSelector(state=> state.expense);
    const changeThemeMode = () =>{
        dispatch(themeActions.toggleTheme());
        
    }
    const downloadExpenses= () =>{
      
        // console.log(expenseList)
        generateCSV(expenseList);
    }
    const logoutHandler = () =>{
        // props.logoutHandler();
        dispatch(expenseActions.resetExpenseState());
        dispatch(themeActions.resetThemeState());
        history.push('/login');
    }
    const rzpTransaction = useCallback(async function rzpTransaction(e){
        // let Razorpay;
        
        const token = localStorage.getItem('token');
        let result =false;
        const response = await axios.get('http://localhost:4000/purchase/premiummembership',{headers:{'Authorization':token}});
        //console.log(response);
        //we dont pass the amount from frontend because its easily editable
        const options ={
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            //this handler function will handle the success payment
            "handler":async function (response){
                await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                    success:true
                },{headers:{'Authorization':token}});
                localStorage.setItem('premium' , true);
                dispatch(expenseActions.setPremium())
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
        // e.preventDefault();
        //if payment fails below code will be executed
        rzp.on('payment.failed' ,async  function(response){
            const res = await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                    success:false
                },{headers:{'Authorization':token}});
            alert('something went wrong')
        })
        
        
    },[dispatch]);
    const premiumHandler =async () =>{
        await rzpTransaction();
    }
  
    return (
        
        <nav className="navbar navbar-expand-lg bg-gradient navbar-dark bg-dark">
            <main>Welcome to Expense Tracker</main>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse d-lg-flex justify-content-end " id="navbarSupportedContent">
                <div>
                    <ul className="navbar-nav ml-auto ">
                        {premium && <li className="nav-item text-center">
                        <button className='btn mb-1 me-3' onClick={changeThemeMode}>{mode==='light' ? '☀️' : '🌑'}</button>
                        </li>}
                        <li className="nav-item text-center">
                        <button className='btn btn-primary mb-1 me-3' onClick={() => history.push('/expense') }>Home</button>
                        </li>
                        {premium  &&( <li className="nav-item text-center">
                        <button className='btn btn-primary mb-1 me-3' onClick={() => history.push('/leaderboard')}>LeaderBoard</button>
                        </li>)}
                        
                        {!premium && <li className="nav-item text-center">
                        <button onClick={premiumHandler} className='btn mb-1 me-2 btn-danger'>Activate Premium</button>
                        </li>}
                        {premium && <li className="nav-item text-center">
                        <button className='btn btn-primary mb-1 me-3' onClick={downloadExpenses}>Download Expense Report</button>
                        </li>}
                        <li className="nav-item text-center">
                        <button className='btn logout'  onClick={logoutHandler}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
       
    
    );
}
export default Header;