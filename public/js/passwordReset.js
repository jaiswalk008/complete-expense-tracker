const resetForm = document.querySelector('.password-reset-form');
resetForm.addEventListener('submit', resetPassword);
const token = localStorage.getItem('token');

async function resetPassword(e){
    e.preventDefault();
    const email = e.target.email.value;
    
    try{
        const res = await axios.post('http://localhost:3000/password/forgotpassword/',{'email':email})
        console.log(res);
        window.location.href = '/views/mailSent.html';
    }
    catch(err){
        document.querySelector('.message-alert').innerText = err.response.data.message;
    }
}
