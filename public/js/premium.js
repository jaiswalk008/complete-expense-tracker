

const leaderboardBtn = document.getElementById('leaderboard-btn');
leaderboardBtn.addEventListener('click',showLeaderBoard);
const downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click',downloadReport);
let flag = false;
let flag2 = false;
// const token = localStorage.getItem('token');
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
        const res = await axios.get('http://localhost:3000/premium/download', { headers: {"Authorization" : localStorage.getItem('token')} })
        const a = document.createElement("a");
        console.log(res.data);
        a.href = res.data;
        a.download = 'myexpense.txt';
        a.click();
    } catch (err) {
        console.log(err);
    }
}
async function showDownloadLogs(){
    
    try {
        const downloads = await  axios.get('http://localhost:3000/premium/downloadlogs', { headers: {"Authorization" : localStorage.getItem('token')} })
        displayDownloads(downloads.data.report);
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