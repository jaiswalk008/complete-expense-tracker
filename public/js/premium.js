const leaderboardBtn = document.getElementById('leaderboard-btn');
leaderboardBtn.addEventListener('click',showLeaderBoard);
const downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click',downloadReport);
let flag = false;
const token = localStorage.getItem('token');
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
async function downloadReport(){
    try {
        const res = await axios.get('http://localhost:3000/premium/download', { headers: {"Authorization" : token} })
        const a = document.createElement("a");
        a.href = res.data.fileUrl;
        a.download = 'myexpense.csv';
        a.click();
    } catch (err) {
        console.log(err);
    }
}