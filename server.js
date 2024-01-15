const express = require("express");
const expressSession = require("express-session");
const { connectMongoose , User } = require("./conn.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(expressSession({ secret: "secret", resave:false, saveUninitialized:false, cookie:{maxAge:600000}}
));
app.use(express.static("public"));

app.set("view engine","ejs");
connectMongoose();

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/service",(req,res)=>{
    res.render("service");
})

app.get("/team",(req,res)=>{
    res.render("team");
})

app.get("/why",(req,res)=>{
    res.render("why");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})


app.post("/register",async (req,res)=>{
    const user = await User.findOne({username : req.body.username});  
    if(!req.body.username || !req.body.password){
        // req.flash("error","Email and Password are required");
        return res.redirect("/register");
    }
    else if(req.body.password.length<8){
        // req.flash("error","Password must be of atleast 8 characters");
        return res.redirect("/register");
    }
    else{
    if(user!=null){
        // req.flash("error","User already exists");
         return res.redirect("/register");
    }
    else{
        const newUser = await User.create(req.body);
        // req.flash("success","Registered succesfully");
    res.redirect("/login");
    }
    }
   
})

app.post("/login",async (req,res)=>{  

    if(!req.body.username || !req.body.password){
        // req.flash("error","Email and Password are required");
        return res.redirect("/login");
    }
    else if(req.body.password.length<8){
        // req.flash("error","Password must be of atleast 8 characters");
        return res.redirect("/login");
    }
    else{
        const user = await User.findOne({username : req.body.username}); 
        if(user!=null){
            if(user.password == req.body.password){
                // req.flash("success",`welcome `+` ${user.firstName}`);
                return res.redirect("/");
            }
            else{
                // req.flash("error","password does'nt matched");
            return res.redirect("/login");}
        }
        else{
            // req.flash("error","username not found");
        return res.redirect("/login");}

    }
})

app.listen(4000 ,()=>{
    console.log("listneing on http://localhost:4000");
});