import Header from "../UI/Header"
import {useSelector , useDispatch} from 'react-redux';
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { fetchExpenseList } from "../Context/expense";
import { Pie } from "react-chartjs-2";
import PieChart from "./PieChart";
const DashBoard = () =>{
    const {expenseList} = useSelector(state => state.expense);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    if(!expenseList.length){
        dispatch(fetchExpenseList(token));
        
    }; 
    
    let aggregatedData= {'Food':0 , 'Movie':0 , 'Bills':0 , 'Others':0};

    
    
    const [expenseData , setExpenseData] = useState({});
    useEffect(() =>{
        //accumulating total expense amount by each category
        const expenseDataByCategory = expenseList.reduce((accumulator, expense) => {
            const { category, amount } = expense;
            accumulator[category] = + amount;
            return accumulator;
          }, {});
          aggregatedData = {...aggregatedData , ...expenseDataByCategory};
          //setting expense data
          setExpenseData({
            labels:Object.keys(aggregatedData),
            datasets:[{
                label:'Expense Data',
                data: Object.values(aggregatedData),
                backgroundColor:['rgba(75,192,192,1)','#50AF95','grey','#f3ba2f'],
                borderColor:'rgba(0,0,0,1)',
                
            }]
        })
    },[expenseList])
    return(
        <div id="dashboard-div">
            <Header/>
            <h1 className="ms-4">DashBoard</h1>
            <hr/>
            {Object.keys(expenseData).length && <div className="d-flex justify-content-evenly">
                <BarChart chartData={expenseData}/>
                <PieChart chartData={expenseData}/>
            </div>}
        </div>
    )

}
export default DashBoard;