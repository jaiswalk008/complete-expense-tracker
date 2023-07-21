

const leaderboardBtn = document.getElementById('leaderboard-btn');

leaderboardBtn.addEventListener('click',showLeaderBoard);
const download = document.getElementById('download');
download.addEventListener('click',downloadReport);
let flag = true;
let flag2 = false;
const rzpBtn2 = document.getElementById('rzp-button');
rzpBtn2.addEventListener('click',rzpTransaction)
const token = localStorage.getItem('token');
async function showLeaderBoard(){
    
    try{
        const res = await axios.get('http://localhost:3000/premium/leaderboard',{
            headers:{'Authorization':localStorage.getItem('token')}
        });
        // console.log(res.data);
        if(res.data.premium ){
            if(flag) {
                // console.log(res.data.results);
                display(res.data.results);
            }
        }
        else{
            document.querySelector('.message-alert').style.display='block';
            document.querySelector('.btn-container').style.display='block';
            
        }
        
    }catch(err){console.log(err);}
}
window.addEventListener('DOMContentLoaded',() =>{
    leaderboardBtn.click();
    const userName = document.querySelector('.user-name');
    
    userName.innerHTML = `${localStorage.getItem('user-name')} <img class="premium-img" title="premium member" src="../assets/images/membership-logo.png" alt="membership">  <i title="logout" onClick="logout()" class="bi bi-power"></i>`;
    if(localStorage.getItem('premium')=='true') {
       
        document.querySelector('.premium-img').style.display = 'block';
    }
})
async function downloadReport(){
    try {
        if(localStorage.getItem('premium')=='true'){
            const res = await axios.get('http://localhost:3000/premium/download', { headers: {"Authorization" : token }})
        const a = document.createElement("a");
        
        a.href = res.data;
        a.download = 'myexpense.txt';
        a.click();
        }
        else alert('Buy Premium Membership');
        
    } catch (err) {
        console.log(err);
    }
}
function display(data){
    
    flag = !flag;
    const list = document.querySelector('.leaderboard-list');
    
    // list.innerHTML='';
    data.forEach((element,index) => {
       
        const li = document.createElement('li');
        li.innerHTML=`<span>${index+1}. ${element.name} - ${element.totalExpense}</span>`;
        list.appendChild(li);
        
    })
    list.style.display='block';
}
async function showDownloadLogs(){
    
    try {
        const downloads = await  axios.get('http://localhost:3000/premium/downloadlogs', { headers: {"Authorization" :token} })
        if(localStorage.getItem('premium')=='true') displayDownloads(downloads.data.report);
        else alert('Buy Premium Membership');
    } catch (err) {
        console.log(err)
    }
 }
 function displayDownloads(data){
    flag2= !flag2;
    const downloadList = document.querySelector('.download-logs');
    
    if(flag2){
        downloadList.innerHTML='';
         
        data.forEach((element,index) => {
            const li = document.createElement('li');
            
            li.innerHTML=`<span>File${index+1} downloaded on ${element.date.substring(1,11)}</span> <a href="${element.fileUrl}" ><button class="btn btn-sm btn-secondary">download</button></a>`;
            downloadList.appendChild(li);
            
        });
        downloadList.style.display = 'block';
    }else{
        downloadList.style.display = 'none';
    }
}
//razorpay action
async function rzpTransaction(e){
    
    
    const response = await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{'Authorization':token}});
    //console.log(response);
    //we dont pass the amount from frontend because its easily editable
    const options ={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        //this handler function will handle the success payment
        "handler":async function (response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
                success:true
            },{headers:{'Authorization':token}});
            document.querySelector('.btn-container').style.display='none';
            document.querySelector('.message-alert').style.display='none';
            document.querySelector('.premium-img').style.display = 'block';
            // const notification = document.querySelector('.premium-notification');
            // notification.innerText ='Your are a premium user now';
            leaderboardBtn.click();
            setTimeout(()=>{
                notification.innerText='';
            },3000);
            localStorage.setItem('premium',true);
            
        }
    }
    const rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();
    //if payment fails below code will be executed
    rzp.on('payment.failed' ,async  function(response){
        const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
                success:false
            },{headers:{'Authorization':token}});
        alert('something went wrong')
    })
}
function logout(){
    window.location.replace('/views/login.html');
}