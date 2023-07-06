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
        const user = axios.post('http://localhost:3000/signup',userDetails);
        form.reset();
    }
    catch(err){console.log(err);}
}
