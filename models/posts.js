var mongoose=require('mongoose');

var postSchema = new mongoose.Schema({
	content:String,
	title:String
});
module.exports = mongoose.model("Post",postSchema);
