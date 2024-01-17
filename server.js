const express = require("express");
const expressSession = require("express-session");
const { connectMongoose , User } = require("./conn.js");
const { UserWallet } = require("./conn.js");
// const { crypto } = require("./bc.js");
const SHA256 = require("crypto-js/sha256");
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

app.get("/vault",(req,res)=>{
    res.render("vault");
})

app.get("/mywallet",(req,res)=>{
    res.render("mywallet");
})

app.get("/mywalletopened",(req,res)=>{
    res.render("mywallet",{userid});

})

app.get("/transactions",(req,res)=>{
    res.render("transactions");
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

app.post("/vault",async (req,res)=>{
    const user = await User.findOne({username : req.body.username});  
    const userRepeat = await UserWallet.findOne({username : req.body.username});  
    if(user!=null){
        const newWalltet = await UserWallet.create(req.body);
        res.redirect("/");
    }
    else{
       res.redirect("/register"); //not registered 
    }
})

app.post("/mywallet",async (req,res)=>{
    const userid = await req.body.username;
    const user = await UserWallet.findOne({username : userid});  
    if(userid!=null && user!=null){
        res.render("mywalletopened",{userid: userid , name:user.firstName , balance: user.balance});
    }
    else{
        res.redirect("/mywallet");
    }
})

app.post("/mywalletopened",(req,res)=>{
    res.render("transactions");
})

app.post("/transactions",async (req,res)=>{
    const obj = await new CryptoBlockchain();
    await obj.addNewBlock(1,`${req.body.date}`,{
                sender : `${req.body.sendername}`,
                recepient : `${req.body.recepientname}`,
                amount : req.body.amount,
            })
            // console.log(crypto);
            res.send("transaction completed");
})


class CryptoBlock {
    constructor(index, timestamp, data, prevHash = " "){
        this.index = index; // assign the value of index to index key and value as the input in the empty obj{}
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = prevHash;
        this.hash = this.createHash();
        this.nonce = 0;
    } // 'this' here is refering to the empty object that will be created.

    createHash() { // returns created hash of the given data
        return SHA256 (
            this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce 
        ).toString();
    }

    pow(difficulty) {
        while(
            this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0") //array.join returns array as string with parameter as the connector
        )
        {
            this.nonce++;
            this.hash = this.createHash();
        }
    }
}

class CryptoBlockchain {

    constructor() {
        this.blockchain = [this.startGenesisBlock()]; //first block or starting point for a particular blockchain
        this.difficulty = 4;
    }
    startGenesisBlock() {
        return new CryptoBlock(0,"17/01/2024","intial block of the chain", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length-1];
    }
    addNewBlock(newBlock) {
        newBlock.previousHash = this.obtainLatestBlock().hash;
        // newBlock.hash = newBlock.createHash();
        newBlock.pow(this.difficulty);
        this.blockchain.push(newBlock);
        // console.log(this.obtainLatestBlock());
    }

    checkChainValidity() {
        for (let i=0;i<this.blockchain.length;i++){
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i-1];

            if(currentBlock.hash !== currentBlock.createHash()){
                return false;
            }
            if(currentBlock.previousHash !== precedingBlock.hash) {return false;}
        }
        return true;
    }
}



app.listen(4000 ,()=>{
    console.log("listneing on http://localhost:4000");
});