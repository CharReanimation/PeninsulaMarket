// Modify File
const fs = require("fs");
const path = require("path");

// Hardhat
const { ethers } = require("hardhat");

async function main() {
    // Deploy Mining Token
    const DeployMiningToken = async () => {
        // Log
        console.log("Deploying MiningToken contract...");

        // Get Contract: MiningToken
        const MiningToken = await ethers.getContractFactory("MiningToken");

        // Deploy Contract: MiningToken
        const miningToken = await MiningToken.deploy();

        // Get MiningToken Contract Address
        const miningTokenContractAddress = await miningToken.getAddress();
        if (!miningTokenContractAddress) {
            throw new Error("Contract Address is undefined!");
        }

        // Return: MiningToken Contract Address
        return miningTokenContractAddress;
    };


    // Deploy Store
    const DeployStore = async (miningTokenContractAddress) => {
        // Log
        console.log("Deploying Store contract...");

        // Get Contract: Store
        const Store = await ethers.getContractFactory("Store");

        // Deploy Contract: Store
        const store = await Store.deploy(miningTokenContractAddress); // Use MiningToken Address

        // Get Store Contract Address
        const storeContractAddress = await store.getAddress();
        if (!storeContractAddress) {
            throw new Error("Store Address is undefined!");
        }

        // Return: Store Contract Address
        return storeContractAddress;
    };


    // Deploy Token Transfer
    const DeployTokenTransfer = async (miningTokenContractAddress) => {
        // Log
        console.log("Deploying TokenTransfer Contract...");

        // Get Contract: Token Transfer
        const TokenTransfer = await ethers.getContractFactory("TokenTransfer");

        // Deploy Contract
        const tokenTransfer = await TokenTransfer.deploy(miningTokenContractAddress); // Use MiningToken Address

        // Get Token Transfer Contract Address
        const tokenTransferContractAddress = await tokenTransfer.getAddress();
        if (!tokenTransferContractAddress) {
            throw new Error("TokenTransfer Address is undefined!");
        }

        // Return: TokenTransfer Contract Address
        return tokenTransferContractAddress;
    }


    // Deploy NFT Create
    const DeployNFTCreate = async () => {
        // Log
        console.log("Deploying NFTCreate Contract...");

        // Get Contract: NFT Creat
        const NFTCreate = await ethers.getContractFactory("NFTCreate");

        // Deploy Contract
        const nftCreate = await NFTCreate.deploy("My NFT Collection", "MNFT");

        // Get NFTCreate Contract Address
        const NFTCreateContractAddress = await nftCreate.getAddress();
        if (!NFTCreateContractAddress) {
            throw new Error("NFTCreate Address is undefined!");
        }

        // Return: NFTCreate Contract Address
        return NFTCreateContractAddress;
    }


    // Deploy Contracts
    const miningTokenContractAddress = await DeployMiningToken();
    const storeContractAddress = await DeployStore(miningTokenContractAddress);
    const tokenTransferContractAddress = await DeployTokenTransfer(miningTokenContractAddress);
    const NFTCreateContractAddress = await DeployNFTCreate();

    // Console Log
    console.log("\n------ ------ ------ All contracts deployed successfully! ------ ------ ------");
    console.log("  MiningToken Contract Address:", miningTokenContractAddress);
    console.log("        Store Contract Address:", storeContractAddress);
    console.log("TokenTransfer Contract Address:", tokenTransferContractAddress);
    console.log("    NFTCreate Contract Address:", NFTCreateContractAddress);
    console.log("------ ------ ------ LINE ------ ------ ------\n")

    // Change Config
    const configPath = path.resolve(__dirname, "Config/contractConfig.js");

    // Read File
    let configContent = fs.readFileSync(configPath, "utf-8");

    // miningTokenContractAddress
    configContent = configContent.replace(
        /export const miningTokenContractAddress = ".*?";/,
        `export const miningTokenContractAddress = "${miningTokenContractAddress}";`
    );

    // storeContractAddress
    configContent = configContent.replace(
        /export const storeContractAddress = ".*?";/,
        `export const storeContractAddress = "${storeContractAddress}";`
    );
    

    // tokenTransferContractAddress
    configContent = configContent.replace(
        /export const tokenTransferContractAddress = ".*?";/,
        `export const tokenTransferContractAddress = "${tokenTransferContractAddress}";`
    );

    // NFTCreateContractAddress
    configContent = configContent.replace(
        /export const NFTCreateContractAddress = ".*?";/,
        `export const NFTCreateContractAddress = "${NFTCreateContractAddress}";`
    );

    // Write File
    fs.writeFileSync(configPath, configContent);
    console.log("contractConfig.js updated successfully!");
}


// Execute Deploy
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
