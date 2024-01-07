
import './App.css'
import Expense from './Components/Expense/Expense';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import { Route , Redirect} from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import LeaderBoard from './Components/LeaderBoard';
import DashBoard from './Components/DashBoard/DashBoard';
import ForgotPassword from './Components/User/ForgotPassword';
import MailSent from './Components/User/MailSent';
import ResetPassword from './Components/User/ResetPassword';
function App() {
  const {token} = useSelector(state => state.auth);
  const {pageStyle} = useSelector(state => state.theme);
  console.log(pageStyle)
  return (
    <div style={pageStyle} className="App">
      <Route path="/" exact>
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/signup"><Signup/></Route>
      <Route path="/login"><Login/></Route>
      <Route path='/leaderboard'>
          {token.length>0 ? <LeaderBoard/>
          :<Redirect to="/login"></Redirect> }
      </Route>
      <Route path='/expense'>
          {token.length>0 ? <Expense/>
          :<Redirect to="/login"></Redirect> }
      </Route>
      <Route path='/dashboard'>
          {token.length>0 ? <DashBoard/>
          :<Redirect to="/login"></Redirect> }
      </Route>
      <Route path="/forgotpassword"><ForgotPassword/></Route>
      <Route path="/mailsent"><MailSent/></Route>
      <Route path="/resetpassword/:uuid"><ResetPassword/></Route>
      
    </div>
  );
}

export default App;
