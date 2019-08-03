var mongoose=require('mongoose');

var userschema = new mongoose.Schema({
	uName:String,
	email:String,
	post:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});
module.exports = mongoose.model("User", userschema);
