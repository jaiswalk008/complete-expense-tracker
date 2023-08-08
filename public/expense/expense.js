
const expenseForm = document.getElementById('expense-form');
expenseForm.addEventListener('submit', addExpense);
const list =document.querySelector('.expense-list');
const token = localStorage.getItem('token');
const rzpBtn = document.getElementById('rzp-button');
rzpBtn.addEventListener('click',rzpTransaction)
let flag2 = false;
const rowsPerPage = document.getElementById('rows');
const downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click',downloadReport);

rowsPerPage.addEventListener("change", function() {
    localStorage.setItem('rows',rowsPerPage.value);
    location.reload();
})

// function to add list elements
function addExpenseInfo(info){
    
    const expense = document.createElement('li');
    expense.id = info.id;
    //adding onClick handlers on edit button and delete an slo passing the id of expense as a parameter
    expense.innerHTML=`<span>${info.amount} - ${info.description} - ${info.category}</span>
    <br><button onClick="editExpense(${info.id})" class="edit  btn-danger"><i class="bi bi-pencil-square"></i></button> 
    <button onClick="deleteExpense(${info.id})" class="delete btn-dark"><i class="bi bi-trash"><i/></button>`;
    list.appendChild(expense);
    list.style.display ='block';
    document.querySelector('.span-expense').style.display='block';
    
}

//function to add expense
async function addExpense(e){
    e.preventDefault();
    let expense = {    
        amount: e.target.expense.value,
        description: e.target.description.value,
        category :e.target.category.value
    };
    
    try{
        const expenseDetails = await axios.post('http://13.127.167.25:3000/expense/addExpense',expense,{
            headers:{'Authorization':token}
        });
        addExpenseInfo(expenseDetails.data);

    }catch(err){console.log(err)}

    expenseForm.reset();
}

//razorpay action
async function rzpTransaction(e){
    

    const response = await axios.get('http://13.127.167.25:3000/purchase/premiummembership',{headers:{'Authorization':token}});
    //console.log(response);
    //we dont pass the amount from frontend because its easily editable
    const options ={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        //this handler function will handle the success payment
        "handler":async function (response){
            await axios.post('http://13.127.167.25:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
                success:true
            },{headers:{'Authorization':token}});
            document.querySelector('.btn-container').style.display='none';
            showPremiumFeatures();
            const notification = document.querySelector('.premium-notification');
            notification.innerText ='Your are a premium user now';
            localStorage.setItem('premium',true);
            setTimeout(()=>{
                notification.innerText='';
            },3000);
            
        }
    }
    const rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();
    //if payment fails below code will be executed
    rzp.on('payment.failed' ,async  function(response){
        const res = await axios.post('http://13.127.167.25:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
                success:false
            },{headers:{'Authorization':token}});
        alert('something went wrong')
    })
}

function showPremiumFeatures(){
     
    document.querySelector('.premium-img').style.display='block';
}
window.addEventListener('DOMContentLoaded',async () =>{
    const userName = document.querySelector('.user-name');
    
    userName.innerHTML = `${localStorage.getItem('user-name')} <img class="premium-img" title="premium member" src="../../assets/images/membership-logo.png" alt="membership">  <i title="logout" onClick="logout()" class="bi bi-power"></i>
    `;
    const rows = localStorage.getItem('rows');
    if(rows){
        rowsPerPage.value=rows;
    }
    else localStorage.setItem('rows',rowsPerPage.value);
    try{
        const expenseDetails = await axios.get(`http://13.127.167.25:3000/expense/getExpense?page=1&rows=${rowsPerPage.value} `,{
            headers:{'Authorization':token}
        });
        localStorage.setItem('premium',expenseDetails.data.premium);
        //using HOF as data is in array 
        if(!expenseDetails.data.premium) document.querySelector('.btn-container').style.display='block';
        else {
            
            showPremiumFeatures();            
        }
    
        expenseDetails.data.expense.forEach((e) => addExpenseInfo(e))
         
        showPagination(expenseDetails.data.pageData);
    }catch(err){console.log(err)}
})

//editing the expense
async function editExpense(id){
    try{
        const expense= await axios.get(`http://13.127.167.25:3000/expense/editExpense/${id}`,{
            headers:{'Authorization':token}
        });
      
        document.getElementById('expense').value = expense.data.amount;
        document.getElementById('description').value = expense.data.description;
        document.getElementById('category').value = expense.data.category;
        //calling delete function to remove that expense
        deleteExpense(id);
    }catch(err){console.log(err)};  
}
//deleting the expense
async function deleteExpense(id){
    
    try{
        await axios.delete(`http://13.127.167.25:3000/expense/deleteExpense/${id}`,{
            headers:{'Authorization':token}
        });
        //the code inside the parathesis will return the li element to be deleted
        list.removeChild(document.getElementById(id));
        if(!list.childElementCount) list.style.display='none';
    }
    catch(err){console.log(err);}
}

function logout(){
    window.location.replace('/user/login.html');
}

function getLiForPagination(page){
    const li =document.createElement('li');
    li.className='page-item';
    const btn = document.createElement('button');
    btn.className="btn btn-sm btn-dark"
    btn.innerHTML=page;
    btn.addEventListener('click', () => getCurrentPageExpense(page));
    li.appendChild(btn);
    return li;
}
function showPagination(pageData){
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML='';
    if(pageData.hasPreviousPage){
        const li = getLiForPagination(pageData.previousPage);
        pagination.appendChild(li);
    }
    const newLi = getLiForPagination(pageData.currentPage);
    pagination.appendChild(newLi);
    if (pageData.hasNextPage) {
        const li = getLiForPagination(pageData.nextPage);
        pagination.appendChild(li);
    }
}
async function getCurrentPageExpense(page) {
    try {
        const expenseDetails = await axios.get(`http://13.127.167.25:3000/expense/getExpense?page=${page}&rows=${rowsPerPage.value}`,{
            headers:{'Authorization':token}
        });
        console.log(expenseDetails.data);
        list.innerHTML='';
        expenseDetails.data.expense.forEach((e) => addExpenseInfo(e))
        showPagination(expenseDetails.data.pageData);
    } catch (err) {
        console.log(err);
    }
}
async function showDownloadLogs(){
    
    try {
        const downloads = await  axios.get('http://13.127.167.25:3000/premium/downloadlogs', { headers: {"Authorization" : localStorage.getItem('token')} })
        if(localStorage.getItem('premium')=='true') displayDownloads(downloads.data.report);
        else alert('Buy Premium Membership');
    } catch (err) {
        console.log(err)
    }
 }
 
 function displayDownloads(data){
    console.log(data)
    flag2= !flag2;
    const downloadList = document.querySelector('.download-logs');
    
    if(flag2){
        downloadList.innerHTML='';
         
        if(data.length){
            data.forEach((element,index) => {
                const li = document.createElement('li');
                
                li.innerHTML=`<span>File${index+1} downloaded on ${element.date.substring(1,11)}</span> <a href="${element.fileUrl}" ><button class="btn btn-sm btn-secondary">download</button></a>`;
                downloadList.appendChild(li);
                
            });
        }else{
            const p = document.createElement('p');
            p.innerText = 'Please download a file first.'
            downloadList.appendChild(p);
        }
        downloadList.style.display = 'block';
    }else{
        downloadList.style.display = 'none';
    }
}

async function downloadReport(){
    try {
        if(localStorage.getItem('premium')=='true'){
            const res = await axios.get('http://13.127.167.25:3000/premium/download', { headers: {"Authorization" : localStorage.getItem('token')} })
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