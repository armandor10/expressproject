var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    name: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
	created_at: {type: Date, default: Date.now}
});

mongoose.model("Client", clientSchema);
