// Components
import { ConvertToBase64 } from "../../Components/ConvertToBase64";

/**
 * Handles the NFT Creation logic for the NFTCreate
 * @param {Object} NFTCreateContract - NFT Create Contract
 * @param {file} file - User's uploaded file
 * @param {string} account - User's account
 * @returns {Promise<void>}
 */

// Required: NFTCreateContract, file, account
export const HandleNFTCreate = async (NFTCreateContract, file, account) => {
    // Variables
    const gasLimit = 50000000;

    try {
        // Check Requirement
        if (!NFTCreateContract || !file || !account) {
            throw new Error("Missing required parameters: NFTCreateContract, file, or account.");
        }

        // Step 1: Upload file to IPFS to get the tokenURI
        /*
        console.log("Uploading file to IPFS...");
        const tokenURI = await uploadToIPFS(file);
        console.log("File uploaded to IPFS. Token URI:", tokenURI);
        */

        // Step 1: Convert file to Base64 URI
        const tokenURI = await ConvertToBase64(file);
        console.log("File converted to Base64. Token URI:", tokenURI);

        // Step 2: Call the createNFT method of the contract
        console.log("Creating NFT on blockchain...");
        const receipt = await NFTCreateContract.methods.createNFT(tokenURI).send({ from: account, gas: gasLimit });

        console.log("NFT Created Successfully! Transaction Receipt:", receipt);
        alert("NFT Created Successfully!");

    } catch (error) {
        console.error("NFT Create Failed:", error);
        alert("Failed to create NFT! Please check the console for details.");
    }
}