const expenseForm = document.getElementById('expense-form');
expenseForm.addEventListener('submit', addExpense);
const list =document.querySelector('.expense-list');


// function to add list elemenst
function addExpenseInfo(info){
    const expense = document.createElement('li');
    expense.id = info.id;
    //adding onClick handlers on edit button and delete an slo passing the id of expense as a parameter
    expense.innerHTML=`<span>${info.amount} - ${info.description} - ${info.category}</span>
    <button onClick="editExpense(${info.id})" class="edit btn-sm btn-secondary">edit</button>
    <button onClick="deleteExpense(${info.id})" class="delete btn-sm btn-dark">delete</button>`;
    list.appendChild(expense);
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
        const expenseDetails = await axios.post('http://localhost:3000/expense/addExpense',expense);
        addExpenseInfo(expenseDetails.data);
    }catch(err){console.log(err)}

    expenseForm.reset();
}
window.addEventListener('DOMContentLoaded',async () =>{
    try{
        const expenseDetails = await axios.get('http://localhost:3000/expense/getExpense');
        //using HOF as data is in array 
        expenseDetails.data.forEach((e) => addExpenseInfo(e))
    }catch(err){console.log(err)}
})
//editing the expense
async function editExpense(id){
    try{
        const expense= await axios.get(`http://localhost:3000/expense/editExpense/${id}`);
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
        await axios.delete(`http://localhost:3000/expense/deleteExpense/${id}`);
        //th code inside the parathesis will return the li element to be deleted
        list.removeChild(document.getElementById(id));
    }
    catch(err){console.log(err);}
}
