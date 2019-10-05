require('../models/product');//initialize mongoose schemas
var mongoose = require('mongoose');//add for Mongo support
var Product = mongoose.model('Product');

exports.save = (req, res, next)=>{
    var body = req.body;
    //console.log(body);
    const instance = new Product(body);
    instance.save( err => {
        if(err){
            res.status(404)
                .send({ban:false,message:"Product didn't create!",data:err});
            return;
        }
        res.status(201)
            .send({ban:true,message:"Product created!",data:instance});
    });
}


exports.getAll = (req, res, next)=>{
    Product.find({})
    .exec((err,resp)=> {
        if(err){
            res.status(404)
                .send({ban:false,message:"Product didn't create!",data:err});
            return;
        }
        res.status(200)
            .send({ban:true,data:resp});
    })
}