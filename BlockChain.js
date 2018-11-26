/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require("crypto-js/sha256");
const LevelSandbox = require("./LevelSandbox.js");
const Block = require("./Block.js");

class Blockchain {
  constructor() {
    this.bd = new LevelSandbox.LevelSandbox();
    this.generateGenesisBlock();
  }

  // Auxiliar method to create a Genesis Block (always with height= 0)
  // You have to options, because the method will always execute when you create your blockchain
  // you will need to set this up statically or instead you can verify if the height !== 0 then you
  // will not create the genesis block
  generateGenesisBlock() {
    // Add your code here
    this.getBlockHeight().then(height => {
      if (height === 0) {
        this.addBlock(
          new Block.Block("First Block in the chain - Genesis Block")
        );
      }
    });
  }

  // Get block height, it is auxiliar method that return the height of the blockchain
  getBlockHeight() {
    // Add your code here
    let self = this;
    return new Promise((resolve, reject) => {
      self.bd
        .getBlocksCount()
        .then(height => {
          resolve(height);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  // Get Block By Height
  getBlock(height) {
    // Add your code here
    let self = this;
    return new Promise((resolve, reject) => {
      self.bd
        .getLevelDBData(height)
        .then(value => {
          console.log;
          resolve(JSON.parse(value));
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  // Add new block
  addBlock(block) {
    // Add your code here
    let self = this;
    return new Promise((resolve, reject) => {
      self
        .getBlockHeight()
        .then(height => {
          block.height = height;
          block.hash = SHA256(JSON.stringify(block)).toString();
          block.time = new Date()
            .getTime()
            .toString()
            .slice(0, -3);
          block.previousBlockHash = self.getBlock(height - 1).hash;
          self.bd.addLevelDBData(
            block.height,
            JSON.stringify(block).toString()
          );
          resolve(block.height);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  // Validate if Block is being tampered by Block Height
  validateBlock(height) {
    let self = this;
    return new Promise((resolve, reject) => {
      this.getBlock(height)
        .then(blockData => {
          //get and parse block object
          let block = JSON.parse(blockData);
          //get block hash
          let blockHash = block.hash;
          // remove block hash to test block integrity
          block.hash = "";
          //generate block hash
          let validBlockHash = SHA256(JSON.stringify(block)).toString();
          //compare hash to validate block
          if (blockHash === validBlockHash) {
            console.log("Valid hash");
            resolve(true);
          } else {
            console.log(
              "Block #" +
                blockHeight +
                " invalid hash: \n" +
                blockHash +
                " <>" +
                validBlockHash
            );
          }
          resolve(false);
        })
        .catch(err => {
          console.log("Error in getBlock in ValidateBlock" + err);
          reject(err);
        });
    });
  }

  // Validate Blockchain
  validateChain() {
    // Add your code here
  }

  // Utility Method to Tamper a Block for Test Validation
  // This method is for testing purpose
  _modifyBlock(height, block) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.bd
        .addLevelDBData(height, JSON.stringify(block).toString())
        .then(blockModified => {
          resolve(blockModified);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
}

module.exports.Blockchain = Blockchain;
