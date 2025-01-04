import React, { useState } from "react"; // React

// Config
import { miningAbi, miningTokenContractAddress, NFTCreateAbi, NFTCreateContractAddress } from "../Config/contractConfig";

// Hook
import useWeb3 from "../Hooks/Contract/useWeb3";
import useAccount from "../Hooks/useAccount"; // Required: miningAbi, miningTokenContractAddress
import useNFTCreateContract from "../Hooks/Contract/useNFTCreateContract";// Required: web3, NFTCreateAbi, NFTCreateContractAddress

// Handler
import { HandleNFTCreate } from "./Handler/HandleNFTCreate"; // Required: NFTCreateContract, file, account


// CSS
import "../../css/Public/Global.css";
import "../../css/Private/NFTCreation.css"

// NFTCreation
const NFTCreation = () => {
    // Hooks
    const web3 = useWeb3(); // Use Web3
    const { account } = useAccount(miningAbi, miningTokenContractAddress); // Use Account
    const { NFTCreateContract } = useNFTCreateContract(web3, NFTCreateAbi, NFTCreateContractAddress); // Use NFT Create Contract

    // States
    const [file, setFile] = useState(null); // File
    const [status, setStatus] = useState(""); // Upload Status

    // Handle File Change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setStatus("Uploading to IPFS...");
        // setStatus("Converting...");

        try {
            // Set Status
            setStatus("Creating NFT...");

            // Handle NFT Create
            await HandleNFTCreate(NFTCreateContract, file, account);

            // Set Status
            setStatus("NFT Created!");
        } catch (error) {
            setStatus("Error creating NFT. Check console for details.");
        }
    };

    // Return
    return (
        <div className="global-page">
            <div className="nft-create-container">
                <h1 className="nft-create-h1">CREATE NFT</h1>
                <div id="nft-create-form-container">
                    <form className="nft-create-form" onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} required />
                        <button id="nft-create-form-btn" type="submit">CREATE NFT</button>
                    </form>
                </div>
                <p>{status}</p>
            </div>
        </div>
    );
}
export default NFTCreation;