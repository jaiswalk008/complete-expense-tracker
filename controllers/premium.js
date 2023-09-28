const User = require('../models/user');
const UserServices = require('../services/userServices')
const S3Service = require('../services/s3Service');
const DownloadLogs = require('../models/downloadLogs');
const Expense = require('../models/expense')
exports.showLeaderBoard = async (req,res) =>{
    try{
        const leaderboardResults = await User.find().select('name totalExpense')
        .sort({ totalExpense: -1 });
        console.log(leaderboardResults);
        res.json({'results':leaderboardResults});
    } 
    catch(err){console.log(err);}
}

 
exports.getReport = async(req,res) =>{
  try {
    const expenses = await Expense.find({userId:req.user[0]._id});
    console.log(expenses);
    const result = expenses.map(data => {
      const value ={
        // Date:data.updatedAt.toString().substring(0,15),
        Amount:data.amount,
        Description:data.description,
        category:data.category
      };
      return value;
    })
    console.log(result);
     
    // // filename depends on userId
    // const userId  = req.user.id;
    // const date = new Date();
    // const fileName = `Expense${userId}/${date}.txt`;
    // const fileUrl =await S3Service.uploadToS3(JSON.stringify(result ), fileName);
    // await DownloadLogs.create({fileUrl:fileUrl , userId :req.user.id, date:JSON.stringify(date)});
    // res.status(200).json(fileUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
exports.getDownloads = async (req,res) =>{
   
  try{
    const downloadLogs = await DownloadLogs.find({userId:req.user[0]._id});
    res.json({'report':downloadLogs});
  }
  catch(err){console.log(err);
    res.json({'message':err})
  }
}