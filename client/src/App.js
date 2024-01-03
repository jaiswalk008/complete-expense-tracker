
import './App.css'
import Expense from './Components/Expense/Expense';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import { Route , Redirect} from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
function App() {
  const {token} = useSelector(state => state.auth);
  const {pageStyle} = useSelector(state => state.theme);
  
  return (
    <div style={pageStyle} className="App">
      <Route path="/" exact>
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/signup"><Signup/></Route>
      <Route path="/login"><Login/></Route>
      <Route path='/expense'>
          {token.length>0 ? <Expense/>
          :<Redirect to="/login"></Redirect> }
      </Route>
     
      
    </div>
  );
}

export default App;
