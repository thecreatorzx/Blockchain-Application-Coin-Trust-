const mongoose = require("mongoose");

exports.connectMongoose = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/crypto-network").then(() => {
        console.log(" connection successful");
    }).catch((e)=>{
        console.log(" no connection");
    });
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    cnfrmpassword: String,
})

const userWallet = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: String ,
    balance: String,
    pin: String,
})

const userTransaction = new mongoose.Schema({
    ud1 : String,
    sendername: String,
    ud2 : String,
    recepientname: String,
    date: String,
    amount: String,
    pin: String,
})

exports.User = mongoose.model("Client",userSchema);
exports.UserWallet = mongoose.model("Wallet",userWallet);
exports.UserTransaction = mongoose.model("Transaction",userTransaction);