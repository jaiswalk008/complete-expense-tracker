const form = document.querySelector('.login-form');
form.addEventListener('submit', userLogin);

async function userLogin(e) {
  e.preventDefault();
  const error = document.getElementById('error');
  const userDetails = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  try {
    const res = await axios.post('http://localhost:3000/login/', userDetails);
    if (res) {
      error.style.display='none';
      alert('user login successful')
      form.reset();
    }
  } catch (err) { 
    if(err.response.status===404){
      error.innerText = err.response.data.message;
    }
    else if(err.response.status===401){
      error.innerText=err.response.data.message;
    }else console.log(err);
    error.style.display='block';
     
  }
}
