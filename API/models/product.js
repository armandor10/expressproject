var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
	created_at: {type: Date, default: Date.now}
});

mongoose.model("Product", productSchema );