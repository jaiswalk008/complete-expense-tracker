const User = require('../models/user');
const Expense = require('../models/expense');

require('dotenv').config();
const UserServices = require('../services/userServices')
const S3Service = require('../services/s3Service');
const DownloadLogs = require('../models/downloadLogs');
exports.showLeaderBoard = async (req,res) =>{
    try{
        const leaderboardResults = await User.findAll({
          attributes:['name','totalExpense'],
          order:[['totalExpense','DESC']]
        })
        res.json(leaderboardResults);
    } 
    catch(err){console.log(err);}
}

 
exports.getReport = async(req,res) =>{
  try {
    const expenses = await UserServices.getExpenses(req);
    console.log(expenses);
    // /const expenseData = expenses.dataValues.map
    //filename should depend on userId
    const userId  = req.user.id;
    const date = new Date();
    const fileName = `Expense${userId}/${date}.txt`;
    const fileUrl =await S3Service.uploadToS3(JSON.stringify(expenses), fileName);
    await DownloadLogs.create({fileUrl:fileUrl , userId :req.user.id, date:JSON.stringify(date)});
    res.status(200).json(fileUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
exports.getDownloads = async (req,res) =>{
  console.log(req.user);
  try{
    const downloadLogs = await DownloadLogs.findAll({where:{userId:req.user.id}});
    res.json({'report':downloadLogs});
  }
  catch(err){console.log(err);
    res.json({'message':err})
  }
}