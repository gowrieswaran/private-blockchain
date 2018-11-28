/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require("./BlockChain.js");
const Block = require("./Block.js");

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function() {
  console.log("Waiting...");
}, 100000);

/******************************************
 ** Function for Create Tests Blocks   ****
 ******************************************/
/*
(function theLoop(i) {
  setTimeout(function() {
    let blockTest = new Block.Block("Test Block - " + (i + 1));
    // Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
    myBlockChain.addBlock(blockTest).then(result => {
      console.log(
        "```````````````````````````````````````````````````````````````````"
      );
      console.log(result);
      console.log(
        "```````````````````````````````````````````````````````````````````"
      );
      i++;
      if (i < 2) theLoop(i);
    });
  }, 100000);
})(0);
*/
/***********************************************
 ** Function to get the Height of the Chain ****
 ***********************************************/

// Be careful this only will work if `getBlockHeight` method in Blockchain.js file return a Promise
/*
myBlockChain
  .getBlockHeight()
  .then(height => {
    console.log(
      "`````````````````````Height of the Chain```````````````````````````"
    );
    console.log(height);
    console.log(
      "```````````````````````````````````````````````````````````````````"
    );
  })
  .catch(err => {
    console.log(err);
  });
*/
/***********************************************
 ******** Function to Get a Block  *************
 ***********************************************/

// Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
/*
myBlockChain
  .getBlock(4)
  .then(block => {
    console.log("Printing the Block - 4 using getBlock()");
    console.log(
      "```````````````````````````````````````````````````````````````````"
    );
    console.log(block);
    console.log(
      "```````````````````````````````````````````````````````````````````"
    );
  })
  .catch(err => {
    console.log(err);
  });
*/
/***********************************************
 ***************** Validate Block  *************
 ***********************************************/

// Be careful this only will work if `validateBlock` method in Blockchain.js file return a Promise
/*
myBlockChain
  .validateBlock(4)
  .then(valid => {
    console.log(
      "`````````````````````Validating Block -4```````````````````````````"
    );
    console.log(valid);
    console.log(
      "```````````````````````````````````````````````````````````````````"
    );
  })
  .catch(error => {
    console.log(error);
  });
*/
/** Tampering a Block this is only for the purpose of testing the validation methods */
/*
myBlockChain
  .getBlock(3)
  .then(block => {
    let blockAux = block;
    blockAux.body = "Tampered Block";
    myBlockChain
      ._modifyBlock(blockAux.height, blockAux)
      .then(blockModified => {
        if (blockModified) {
          myBlockChain
            .validateBlock(blockAux.height)
            .then(valid => {
              console.log(
                "`````````````Tampering Block-3 & Validating````````````````````````"
              );
              console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
              console.log(
                "```````````````````````````````````````````````````````````````````"
              );
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("The Block wasn't modified");
        }
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
*/
/*
myBlockChain
  .getBlock(4)
  .then(block => {
    let blockAux = block;
    blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
    myBlockChain
      ._modifyBlock(blockAux.height, blockAux)
      .then(blockModified => {
        if (blockModified) {
          console.log(
            "```````````````Tampering Block-4 Hash & Validate```````````````````"
          );
          console.log("The Block was modified");
          console.log(
            "```````````````````````````````````````````````````````````````````"
          );
        } else {
          console.log("The Block wasn't modified");
        }
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
*/
/***********************************************
 ***************** Validate Chain  *************
 ***********************************************/

/*
// Be careful this only will work if `validateChain` method in Blockchain.js file return a Promise
myBlockChain.validateChain().then((errorLog) => {
	if(errorLog.length > 0){
		console.log("The chain is not valid:");
		errorLog.forEach(error => {
			console.log(error);
		});
	} else {
		console.log("No errors found, The chain is Valid!");
	}
})
.catch((error) => {
	console.log(error);
})
*/
/***********************************************
 ************ Delete LevelDB data **************
 ***********************************************/
//myBlockChain.clearDBData();
