const leaderboardBtn = document.getElementById('leaderboard-btn');
leaderboardBtn.addEventListener('click',showLeaderBoard);
let flag = false;
async function showLeaderBoard(){
    try{
        const res = await axios.get('http://localhost:3000/premium/leaderboard');
        //console.log(res.data);
        display(res.data);
    }catch(err){console.log(err);}
}
function display(data){
    flag = !flag;
    const list = document.querySelector('.leaderboard-list');
    if(flag){
        list.innerHTML='';
        data.forEach(element => {
            const li = document.createElement('li');
            //if(!element.total) element.total=0;
            li.innerHTML=`<span>${element.name} - ${element.totalExpense}</span>`;
            list.appendChild(li);
        });
        list.style.display = 'block';
    }else{
        list.style.display = 'none';
    }
}