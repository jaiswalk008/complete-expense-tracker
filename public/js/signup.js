const form = document.querySelector('.form')
form.addEventListener('submit',addUser);

async function addUser(e){
    e.preventDefault();
    const userDetails ={
        name: e.target.name.value,
        email : e.target.email.value,
        password : e.target.password.value
    }
    try{
        const res =await axios.post('http://localhost:3000/signup/',userDetails);
        if(res.data.userFound){
            //if user exist
            document.getElementById('error').style.display='block';
        }
        else{ 
            //if the user changes the email id and then submits then the error should not be displayed
            document.getElementById('error').style.display='none';
            form.reset();
            //after signup redirecting for login
            window.location.replace('/views/login.html');
        }
    }
    catch(err){console.log(err);}
}
