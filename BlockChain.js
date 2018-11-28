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
          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          //console.log(JSON.parse(value));
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
          block.time = new Date()
            .getTime()
            .toString()
            .slice(0, -3);
          if (block.height > 0) {
            self
              .getBlock(block.height - 1)
              .then(value => {
                //let valueParse = JSON.parse(value);
                block.previousBlockHash = value.hash;
                block.hash = SHA256(JSON.stringify(block)).toString();
                self.bd.addLevelDBData(
                  block.height,
                  JSON.stringify(block).toString()
                );
                resolve(block);
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          }
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
      self
        .getBlock(height)
        .then(blockData => {
          //get block object
          let block = blockData;
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
              "```````````````````````````````````````````````````````````````````"
            );
            console.log(
              "Block #" +
                blockData.height +
                " invalid hash: \n" +
                blockHash +
                "\n" +
                " <>" +
                "\n" +
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

  /************************************************** */
  /*clearDBData() {
    let self = this;
    self
      .getBlockHeight()
      .then(height => {
        for (let i = 0; i <= height; i++) {
          self.bd
            .delLevelDBData(i)
            .then(key => {
              console.log("Deleted Block #" + key);
              //resolve(key);
            })
            .catch(err => {
              console.log("Error deleting Block", err);
              reject(err);
            });
        }
        //resolve(i);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  } */
}
module.exports.Blockchain = Blockchain;
