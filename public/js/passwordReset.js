const form = document.querySelector('.password-reset-form');
form.addEventListener('submit', resetPassword);

async function resetPassword(e){
    const email = e.target.email.value;
    console.log(email);
    try{
        const res = await axios.post('http://localhost:3000/password/forgotpassword/',{'email':email})

    }
    catch(err){console.log(err);}
}