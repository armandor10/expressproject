var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    number: {type: String, required: true},
    client:{type: Schema.Types.ObjectId, ref: 'Client', required: true},
    orderProducts: [{type: Schema.Types.ObjectId, ref: 'OrderProduct', required: true}],
	created_at: {type: Date, default: Date.now}
});

mongoose.model("Order", orderSchema);