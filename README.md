# Building Your Own Private Blockchain

## About

Building your Private Blockchain utilizing Node.js with LevelDB.

## Getting Started

1. Download the project.
2. Run `npm install` to install the project dependencies
3. The project uses the following dependencies
    `npm install level` - Fast and Simple storage wrapper
    `npm install crypto-js` - JavaScript library of crypto standards

## Project files & Purpose

1. Block.js               - Creates a new block
2. Blockchain.js          - Creates a new blockchain class which has the following methods

   `generateGenesisBlock` - Creates Genesis block when the BlockChain is created <br>
   `getBlockHeight`       - Method that returns the height of the BlockChain <br>
   `getBlock`             - Method to get the block data <br>
   `addBlock`             - Method to add block to the BlockChain <br>
   `validateBlock`        - Method that validates the blocks <br>
   `validateBlockLink`    - Method that validates the link(hash) between the blocks <br>
   `validateBlockChain`   - Method that validates the blockchain <br>
   `_modifyBlock`         - Utility method to modify block(for testing) <br>
   `clearDBData`          - Utility method to clear test data <br>

3. LevelSandbox.js        - Implements the data interaction for your Private Blockchain. It is the Data Access Layer for the application

    `addLevelDBData`      - Method that adds data to LevelDB. <br>
    `getLevelDBData`      - Method to fetch data from LevelDB. <br>
    `getBlocksCount`      - Method to get the count(key) from Level DB. <br>
    `delLevelDBData`      - Utility method to delete the test data. <br>
    `getAllBlocks`        - Utility method to fetch entire data.<br>

4. simpleChain.js         - File which has all the methods to test the various functionalities to validate the BlockChain.

   In order to validate a BlockChain, the block is validated first and later the link(hash) between the blocks is validated. This ensures that the blocks are not tampered and broken. Once a block becomes Invalid, the entire blockchain becomes Invalid notifying all the blocks following the tampered block.

# How to Run

Open command prompt and type `node simpleChain.js` (make sure the functionality to be tested is uncommented)

1. Create Test blocks 

![Screenshot of the test blocks](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/Testblocks-10.png)

2. Get the height of the chain

![Height of the chain](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/heightbc.png)

3. Validate the blockchain

![Validating the blockchain](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/validate-chain.png)

4. Tampering a block(data) and validating
![Tampered block](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/tamp-validate.png)

5. Validating the Blockchain as there is a tampered block
![Invalid Blockchain](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/invalid-bc.png)

6. Tampering a block by changing prevHash and validating
![Tampered Hash](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/tamp-hash-val.png)

7. Validating the entire chain with tampered blocks/hash
![Invalid blockchain](https://github.com/gowrieswaran/private-blockchain/blob/master/screenshots/invalid-bc1.png)
