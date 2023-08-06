const User = require('../models/user');
const UserServices = require('../services/userServices')
const S3Service = require('../services/s3Service');
const DownloadLogs = require('../models/downloadLogs');

exports.showLeaderBoard = async (req,res) =>{
    try{
        const leaderboardResults = await User.findAll({
          attributes:['name','totalExpense'],
          order:[['totalExpense','DESC']]
        })
        res.json({'results':leaderboardResults , "premium":req.user.premium});
    } 
    catch(err){console.log(err);}
}

 
exports.getReport = async(req,res) =>{
  try {
    const expenses = await UserServices.getExpenses(req);
    const result = expenses.map(data => {
      const value ={
        Date:data.updatedAt.toString().substring(0,15),
        Amount:data.amount,
        Description:data.description,
        category:data.category
      };
      return value;
    })
     
    // filename depends on userId
    const userId  = req.user.id;
    const date = new Date();
    const fileName = `Expense${userId}/${date}.txt`;
    const fileUrl =await S3Service.uploadToS3(JSON.stringify(result ), fileName);
    await DownloadLogs.create({fileUrl:fileUrl , userId :req.user.id, date:JSON.stringify(date)});
    res.status(200).json(fileUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
exports.getDownloads = async (req,res) =>{
   
  try{
    const downloadLogs = await DownloadLogs.findAll({where:{userId:req.user.id}});
    res.json({'report':downloadLogs});
  }
  catch(err){console.log(err);
    res.json({'message':err})
  }
}