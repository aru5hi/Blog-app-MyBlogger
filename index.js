var    express = require("express"),
	 		 bp=require("body-parser"),
		  route=require("./modules/routes/router.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/demo_db");
var Post= require("./models/posts");
var User= require("./models/user");

var app=express();
app.set("view engine", "ejs");

app.use("/", route);
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
	
app.post("/posts",function(req,res){
 	var post = new Post(req.body);
 	post.save(function(err,post){
 		if(err){
 			console.log(err);
 			res.render("error");
 		} 
 		else{
 			Post.findOne({title:post.title},function(err,p){
	User.findOne({uName:"Arushi Mishra"}, function(err,foundU){
		if(err) console.log(err);
		else{
			foundU.post.push(p);
			foundU.save(function(err,y){
				if(err){
 					console.log(err);
 					res.render("error");
 				} 
				else{
					res.redirect("/posts");
				}
			});
		}
	});
});
 		}
 	});
});

app.post("/delete" ,function(req,res){
	var x=Post.findOne({_id:req.body.del_id});
	x.deleteOne(function(err,x){
		if(err) console.log("err");
		else{
			res.redirect("/posts");
		}
	});

});
// app.get("/posts/:id",function(req,res){
// 	Post.findOne({_id:req.param('id')}).exec(function(err,p){
// 	if(err) console.log(err);
// 	else{
// 		res.render("your_post",{p:p});
// 	}
// });
	
// });

// // app.post("/posts", function())

// // Post.findOne({title:"HIMACHAL TRIP"},function(err,p){
// // 	User.findOne({uName:"Arushi Mishra"}, function(err,foundU){
// // 		if(err) console.log(err);
// // 		else{
// // 			foundU.post.push(p);
// // 			foundU.save(function(err,y){
// // 				if(err) console.log(err);
// // 				else{
// // 					console.log(y);
// // 				}
// // 			});
// // 		}
// // 	});
// // });
// // User.findOne({uName:'Arushi Mishra'}).populate("post").exec(function(err,u){
// // 	if(err) console.log(err);
// // 	else{
// // 		console.log(u.post[2]);
// // 	}
// // }); 
app.listen(3000,function(){
	console.log("Server now running at localhost:3000");
});