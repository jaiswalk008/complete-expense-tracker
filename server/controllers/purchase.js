const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');


exports.purchasePremium = async (req, res ) =>{
    try {
        const rzp = new Razorpay({
            key_id:process.env.key_id,
            key_secret: process.env.key_secret
        })
        const amount = 2500;
        rzp.orders.create({amount,currency: "INR"}, async (err,order) =>{
            if(err){
                console.log(err)
            }
            //user and order have one to many relationship
            //this is when the user has just clicked on but premium button
            try{
            
                const newOrder = new Order({ orderId: order.id, status: 'PENDING', paymentId: null, userId:req.user[0]._id });
                await newOrder.save();
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
        console.log(order_id);
        if(success){
            // console.log(req.user[0]._id);
            
            // const order =await Order.findOne({orderId : order_id});
            // console.log(order._id);
            const updatePaymentId = await Order.findOneAndUpdate(
                {orderId : order_id},
               { paymentId: payment_id, status: "SUCCESSFUL" },
                { new: true } // This option returns the updated document
              );
            const updatePremiumStatus =await  User.findByIdAndUpdate({_id:req.user[0]._id},{premium: true});
           
            return res.status(202).json({success:true , message: "transaction successful"});
        }
        //if payment fails
        else{
            const order =await  Order.findOne({orderid : order_id});
            const updatePaymentId = await Order.findOneAndUpdate(
                { userId: req.user[0]._id },
                { $set: { paymentId: payment_id, status: "FAILED" } },
                { new: true } 
              );
            //  const updateStatus=await Order.updateOne({paymentid:payment_id , status : "Failed"});
            return res.status(202).json({success:false , message: "transaction unsuccessful"});
        }
    } catch (error) {
        console.log(error);
    }
}