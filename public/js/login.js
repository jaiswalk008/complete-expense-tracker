const form = document.querySelector('.login-form');
form.addEventListener('submit',userLogin);

async function userLogin(e){
    e.preventDefault();
    const userDetails ={
        email: e.target.email.value,
        password: e.target.password.value
    }
    try{
        const res =await  axios.post('http://localhost:3000/login',userDetails);
        const error = document.getElementById('error');
        if(res.data.credentials) {
            error.style.display="none";
            form.reset();
            alert('user loggedin')
        }
        else if(res.data.credentials==false){
            error.innerText = "incorrect password!!"
            error.style.display='block';
        }
        else {
            error.innerText = "Email does not exist!!!"
            error.style.display='block';
        }
    }
    catch(err) { console.log(err); }
}