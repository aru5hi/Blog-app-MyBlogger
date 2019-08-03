var express=require("express"),
		 bp=require("body-parser");
var app=express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/demo_db");
var Post= require("../../models/posts");
var User= require("../../models/user");

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

module.exports.home=function(req,res){
	res.render("home");
}
module.exports.posts_list=function(req,res){
	User.findOne({uName:'Arushi Mishra'}).populate("post").exec(function(err,u){
	if(err) console.log(err);
	else{
		var p=u;
		res.render("posts",{p:p});
	}
}); }

module.exports.post_display=function(req,res){
	Post.findOne({_id:req.params.id}).exec(function(err,p){
	if(err) console.log(err);
	else{
		res.render("your_post",{p:p});
	}
});
	
}
