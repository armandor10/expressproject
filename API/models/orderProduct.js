var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderProductSchema = new Schema({
    amount: {type: Number , required: true, default: 1,  min: 1},
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
	created_at: {type: Date, default: Date.now}
});

mongoose.model("OrderProduct", orderProductSchema);