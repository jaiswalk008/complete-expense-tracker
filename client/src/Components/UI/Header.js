import '../Expense/Expense.css';
import { useDispatch , useSelector} from 'react-redux';
import { themeActions , expenseActions } from '../Context/store';
import generateCSV from '../Expense/generateCSV';
// import rzpTransaction from '../Helpers/razorPay';
import { useCallback } from 'react';
import axios from 'axios';
const Header = (props) =>{
    const dispatch = useDispatch();
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
        props.logoutHandler();
        dispatch(expenseActions.resetExpenseState());
        dispatch(themeActions.resetThemeState());
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
        // console.log(result + 'of rzp transaction');
        // console.log(localStorage.getItem('premium'))
        // if(localStorage.getItem('premium')==='true') {
        //     dispatch(expenseActions.setPremium())
        //     console.log('premium user')
        // };
    }
    return (
        <nav className="navbar">
            <main>Welcome to Expense Tracker</main>
            <div>
                {/* {console.log(premium)} */}
                {premium  &&  <button className='btn me-3' onClick={changeThemeMode}>{mode==='light' ? '☀️' : '🌑'}</button>}
                {premium  && <button className='btn btn-primary me-3' onClick={downloadExpenses}>Download Expense Report</button>}
                {!premium && <button onClick={premiumHandler} className='btn me-2 btn-danger'>Activate Premium</button>}
                {/*<span>Your profile is Incomplete <span onClick={completeProfileHandler} id="complete">Complete now</span></span> */}
                <button className='btn logout'  onClick={logoutHandler}>Logout</button>
            </div>
            
        </nav>
    );
}
export default Header;