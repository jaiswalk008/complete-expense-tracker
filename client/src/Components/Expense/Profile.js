import { useState 
    , useEffect} from "react"
import Input from "../UI/Input"
import './Expense.css'
import axios from "axios";
// import AuthContext from '../Context/AuthContextProvider';

const Profile = ({clickHander}) =>{
    const [name , setName] = useState('');
    const [url , setUrl] = useState('');
    const [profileUpdated,setProfileUpdated] = useState(false);
    const fetchProfile = async()=>{
        try{
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='+process.env.REACT_APP_AUTH_KEY,
        {idToken:localStorage.getItem('token')});
        console.log(res.data.users[0]);
        setName(res.data.users[0].displayName);
        setUrl(res.data.users[0].photoUrl);
        }
        catch(err){console.log(err)}

    }
    // const authCtx = useContext(AuthContext);
    const nameChangeHandler = (e) => {setName(e.target.value)}
    const urlChangeHandler = (e) => {setUrl(e.target.value)}
    useEffect(() =>{
        fetchProfile();
    },[])
    const updateProfile = async (e) =>{
        e.preventDefault();
        const profileDetails={
            idToken:localStorage.getItem('token'),
            displayName:name,
            photoUrl:url,
        }
       try {
        const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key='+process.env.REACT_APP_AUTH_KEY,
        profileDetails);
        console.log(res.data);
        setProfileUpdated(true);
       } catch (error) {
            console.log(error);
       }

    }
    return (
        <div className="profile-container">
           {!profileUpdated &&  <>
            <div className="w-100">
                <span>Contact Details</span>
                <button className="btn float-end btn-danger" onClick={clickHander}> Cancel</button>
            </div>
            <form onSubmit={updateProfile}>
                <Input id="name" label="Full Name:" type="text" value={name} onChange={nameChangeHandler} />
                <Input id="profile-photo" label="Profile Photo URL:" type="url" value={url} onChange={urlChangeHandler} />
                <button id="update" className="btn">Update</button>
            </form></>}
            {profileUpdated && <h3>Profile Updated!!</h3>}
            <hr></hr>
        </div>
    )
}
export default Profile;