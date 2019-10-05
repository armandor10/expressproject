require('../models/client');//initialize mongoose schemas
require('../models/order');//initialize mongoose schemas

var mongoose = require('mongoose');//add for Mongo support
var Client = mongoose.model('Client');
var Order = mongoose.model('Order');

exports.save = (req, res, next)=>{
    var body = req.body;
    console.log(body);
    const client = new Client(body);
    client.save( err => {
        if(err){
            res.status(404).send({ban:false,message:"Client didn't create!",data:err});
            return;
        }
        res.status(201).send({ban:true,message:"Client created!",data:client});
    });
}


exports.getAll = (req, res, next)=>{
    Client.find({})
    .exec((err,resp)=> {
        if(err){
            res.status(404).send({ban:false,message:"Client didn't create!",data:err});
            return;
        }
        res.status(200)
            .send({ban:true,data:resp});
    })
}

exports.getClientOrders = (req, res, next) => {
    const clientId = req.params.id;
    Order.find({ client: clientId })
    .populate({
        path: "orderProducts",
        populate: {
            path: 'product'
        }
    })
    .populate("client")
    .exec((err,resp)=> {
        if(err){
            res.status(404)
                .send({ban:false,message:"Order didn't create!",data:err});
            return;
        }
        res.status(200)
            .send({ban:true,data:resp});
    })
}