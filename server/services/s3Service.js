const AWS = require('aws-sdk');


const uploadToS3 = (data,fileName) =>{
    const BUCKET_NAME='my-expense-tracker';
    const USER_KEY = process.env.IAM_USER_ACCESS_KEY;
    const SECRET_KEY = process.env.IAM_USER_SECRET_ACCESS_KEY;
  
    //creating an S3 instance
    let s3Bucket = new AWS.S3({
      accessKeyId: USER_KEY,
      secretAccessKey: SECRET_KEY,
    })
    let params ={
      Bucket : BUCKET_NAME,
      Key:fileName,
      Body: data,
      ACL: 'public-read'
    };
    return new Promise((resolve,reject)=>{
      s3Bucket.upload(params , (err,res) =>{
        if(err) reject(err);
        else {
          console.log(res);
          resolve(res.Location);
        }
      })
    })
   }
  module.exports = {uploadToS3};