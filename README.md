# Building Your Own Private Blockchain

##About

Building your Private Blockchain utilizing Node.js with LevelDB.

##Getting Started

1. Download the project.
2. Run `npm install` to install the project dependencies
3. The project uses the following dependencies
    `npm install level` - Fast and Simple storage wrapper
    `npm install crypto-js` - JavaScript library of crypto standards

##Project files & Purpose

1. Block.js               - Creates a new block
2. Blockchain.js          - Creates a new blockchain class which has the following methods

   `generateGenesisBlock` - Creates Genesis block when the BlockChain is created.
   `getBlockHeight`       - Method that returns the height of the BlockChain.
   `getBlock`             - Method to get the block data.
   `addBlock`             - Method to add block to the BlockChain.
   `validateBlock`        - Method that validates the blocks.
   `validateBlockLink`    - Method that validates the link(hash) between the blocks.
   `validateBlockChain`   - Method that validates the blockchain.
   '_modifyBlock'         - Utility method to modify block(for testing).
   `clearDBData`          - Utility method to clear test data.

3. LevelSandbox.js        - Implements the data interaction for your Private Blockchain. It is the Data Access Layer for the application

    `addLevelDBData`      - Method that adds data to LevelDB.
    `getLevelDBData`      - Method to fetch data from LevelDB.
    `getBlocksCount`      - Method to get the count(key) from LevelDB.
    'delLevelDBData'      - Utility method to delete the test data.
    'getAllBlocks'        - Utility method to fetch entire data.

4. simpleChain.js         - File which has all the methods to test the various functionalities to validate the BlockChain.

   In order to validate a BlockChain, the block is validated first and later the link(hash) between the blocks is validated. This ensures that the blocks are not tampered and broken. Once a block becomes Invalid, the entire blockchain becomes Invalid notifying all the blocks following the tampered block.
