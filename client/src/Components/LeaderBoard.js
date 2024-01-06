import { useCallback, useState, useEffect } from "react";
import Header from "./UI/Header";
import axios from "axios";
import { useSelector } from "react-redux";
const LeaderBoard = () =>{
    const [LeaderBoardList , setLeaderBoardList] = useState([]);
    const {mode} = useSelector(state => state.theme);
    const fetchLeaderBoard = useCallback(async () =>{
        try {
            const res = await axios.get('http://localhost:4000/premium/leaderboard');
            setLeaderBoardList(res.data.results);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    },[])
    useEffect(() =>{
        fetchLeaderBoard();
    },[LeaderBoardList])
    return (
       <>
        <Header/>
        <div id="leaderboard-div" className={mode==='light' ?"container":"container  bg-dark" }>
            
            <h1>LeaderBoard</h1>
            <hr ></hr>
            <table className={mode==='light' ?"table table-hover":"table table-dark border-light  table-hover" }> 
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {LeaderBoardList.length > 0 && LeaderBoardList.map((element, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.name}</td>
                                <td>{element.totalExpense}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
       </>
    )
}
export default LeaderBoard;