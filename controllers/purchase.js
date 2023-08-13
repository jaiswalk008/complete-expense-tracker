const Razorpay = require('razorpay');
const Order = require('../models/order');
// const User = require('../models/user');


exports.purchasePremium = async (req, res ) =>{
    try {
        const rzp = new Razorpay({
            key_id:process.env.key_id,
            key_secret: process.env.key_secret
        })
        const amount = 2500;
        rzp.orders.create({amount,currency: "INR"},async (err,order) =>{
            if(err){
                console.log(err)
            }
            //user and order have one to many relationship
            //this is when the user has just clicked on premium button
            try{
                await  req.user.createOrder({orderid : order.id , status :'PENDING'});
                res.status(201).json({order,key_id : rzp.key_id})
            }catch(err){console.log(err)};
        })
    } catch (err) {
        console.log(err);
    }
}

exports.updateTransaction = async (req,res) =>{
    //if payment is successful
    try {
        const {payment_id , order_id,success} = req.body;
       
        if(success){
            
            const order =await Order.findOne({where:{orderid : order_id}});
            const updatePaymentId = order.update({paymentid:payment_id , status : "SUCCESSFUL"});
            const updatePremiumStatus = req.user.update({premium: true});
            await Promise.all([updatePaymentId,updatePremiumStatus]);
            return res.status(202).json({success:true , message: "transaction successful"});
        }
        //if payment fails
        else{
            const order =await  Order.findOne({where:{orderid : order_id}});
             
            const updateStatus=await order.update({paymentid:payment_id, status : "FAILED"});
            return res.status(202).json({success:false , message: "transaction unsuccessful"});
        }
    } catch (error) {
        console.log(error);
    }
}