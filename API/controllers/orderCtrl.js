require('../models/order');//initialize mongoose schemas
require('../models/orderProduct');//initialize mongoose schemas
require('../models/product');//initialize mongoose schemas

var mongoose = require('mongoose');//add for Mongo support
var Order = mongoose.model('Order');
var OrderProduct = mongoose.model('OrderProduct');
var Product = mongoose.model('Product');

exports.save = (req, res, next)=>{
    var body = req.body;
    //console.log( JSON.stringify(body));
    Promise.all(saveOrdersProducts(body.orderProducts))
    .then(resp => {
        const order = new Order({
            number: body.number,
            orderProducts: resp,
            client: body.client._id
        });
        order.save( err => {
            if(err){
                res.status(404)
                    .send({ban:false,message:"Order didn't create!",data:err});
                return;
            }
            res.status(201)
                .send({ban:true,message:"Order created!",data:order});
        });
    }, err => {
        res.status(404)
            .send({ban:false,message:"Order didn't create!",data:err});
    });
}

exports.getAll = (req, res, next)=>{
    Order.find({})
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

const saveOrdersProducts = orderProducts => {
    var promises = [];
    //console.log("products", orderProducts)
    orderProducts.forEach(element => {
        promises.push(
            new Promise((resolve, reject) => {
                const oProduct = new OrderProduct({
                    product: element.product._id,
                    amount: element.amount
                });
                oProduct.save( err => {
                    if(err){
                        reject();
                        return;
                    }
                    resolve(oProduct);
                });
            }
        ));                      
    });
    return promises;
}