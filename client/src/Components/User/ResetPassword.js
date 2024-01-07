import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from '../UI/Input';
import { useCallback, useState , useEffect } from "react";
import axios from 'axios';
const ResetPassword = () =>{
    const {uuid}= useParams();
    // console.log(uuid);
    const [password ,setPassword] = useState('');
    const [linkUsed , setLinkUsed] = useState(false);
    const [showComponent,setShowComponent] = useState(false);
    const history = useHistory();
    const passwordChangeHandler = (e) => setPassword(e.target.value);
    const resetPasswordHandler = useCallback(async (e) =>{
        e.preventDefault();
        try {
           console.log('before request')
            const res = await axios.post('http://localhost:4000/updatepassword/',{'password':password, 'uuid':uuid});
            console.log(res.data.message);
            console.log('after request')
            history.push('/login');
            console.log(history);
        } catch (error) {
            console.log(error);
        }
    },[password,history,uuid])
    const checkLink = useCallback(async () =>{
        try{
            console.log(uuid);
            const res = await axios.get('http://localhost:4000/checkLink/'+uuid);
            console.log(res.data.message);
            if(res.data.message === 'link used') {
                setLinkUsed(true);
                setShowComponent(true);
            }
            else{
                setShowComponent(true);
            }
        }
        catch(err){
            console.log(err);
        }
    },[uuid])
    useEffect (() =>{
        checkLink();
    },[checkLink])
    if(!showComponent) return null;
    return (
        !linkUsed ? <div style={{width:"450px"}} className="container p-3 mt-5 d-flex flex-column align-content-center ">
        <h4 >Password Reset</h4>
        <hr/>
        <form onSubmit={resetPasswordHandler}>
            <Input label="Enter a new password:" id="password" type="password" value={password} onChange={passwordChangeHandler} />
            <button className="btn btn-success w-100 mt-3">Reset My Password</button> 
        </form>
        
        </div>:  <div className="container p-3 mt-5 d-flex flex-column align-content-center ">
            <h4 >Link already used!!</h4>
            <Link to="/forgotpassword">Click here to reset password</Link>
        </div>
    )
}
export default ResetPassword;