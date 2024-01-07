import { useCallback, useState } from 'react';
import Header from '../UI/Header';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
const ForgotPassword = () =>{
    const  [email,setEmail] = useState('');
    const [errorMessage ,setErrorMessage] = useState('');
    const history = useHistory();
    const formSubmitHandler = useCallback( async (e) =>{
        e.preventDefault();
        console.log(email);
        try{
            const res = await axios.post('http://localhost:4000/forgotpassword/',{'email':email})
            console.log(res);
            history.push('/mailsent');
        }
        catch(err){
            console.log(err);
            setErrorMessage(err.response.data.message);
        }
    },[email])
    return (
        <>
            {/* <Header/> */}
            <div style={{width:"450px"}} className="container p-3 mt-5 d-flex flex-column align-content-center ">
                <h4 className="">Password Reset</h4>
                <hr/>
                <p className="message-alert">Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.
                <br/>{errorMessage}</p>
                <form className="password-reset-form" onSubmit={formSubmitHandler}>

                    <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                     name="email" required/>
                    <button className="btn btn-success w-100  mt-3" type="submit">Reset My Password</button> 
                </form>
        
            </div>
        </>
    )

}
export default ForgotPassword;