var express=require("express"),
    router=express.Router(),
    bp=require("body-parser"),
	app=express(),
	controller=require("../controllers/controller.js");

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

router.route("/")
.get(controller.home);

router.route("/posts")
.get(controller.posts_list);

router.route("/posts/:id")
.get(controller.post_display);

router.route("/post-add")
.get(function(req,res){
	res.render("post_add");
});

module.exports=router;