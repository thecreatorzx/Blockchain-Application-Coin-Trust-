const SHA256 = require("crypto-js/sha256");
// const senderId = document.getElementById("senderid");
// const recepientId = document.getElementById("recepientid");

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


// obj.invoke();
// console.log("the blockchain mining in process");
//  obj.addNewBlock(
//     new CryptoBlock(1,"17/01/2024",{
//         sender : `krishan`,
//         recepient : `shivam`,
//         amount : 200,
//     })
// )
// exports.crypto = new CryptoBlockchain();

// console.log(JSON.stringify(obj, null , 4));