import React, { useEffect } from "react"; // React

// Config
import { miningAbi, miningTokenContractAddress } from "../Config/contractConfig";

// Hook
import useWeb3 from "../Hooks/Contract/useWeb3";
import useAccount from "../Hooks/useAccount"; // Required: miningAbi, miningTokenContractAddress
import useMiningContract from "../Hooks/Contract/useMiningContract"; // Required: web3, miningAbi, miningTokenContractAddress

// Handler
import { HandleRaffle } from "./Handler/HandleRaffle"; // Required: web3, account, balance, miningTokenContract, refreshBalance

// CSS
import "../../css/Public/Global.css";
import "../../css/Private/Raffle.css";

// Raffle
const Raffle = () => {
    // Hooks
    const web3 = useWeb3(); // Use Web3
    const { account, balance, refreshBalance } = useAccount(miningAbi, miningTokenContractAddress); // Use Account
    const { miningTokenContract } = useMiningContract(web3, miningAbi, miningTokenContractAddress); // Use Mining Contract

    // Force Refresh Balance
    useEffect(() => {
        if (refreshBalance) {
            refreshBalance();
        }
    }, [refreshBalance]);


    // Return: HTML
    return (
        <div className="global-page">
            <div id="raffle-container">
                <div id="raffle-video-container">
                    <video autoPlay loop className="raffle-video">
                        <source src="/music_data/music_video/GleamHypedTest.MP4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <strong>Balance: </strong>{balance} TOKENS
                <button
                    id="raffle-btn"
                    onClick={() => HandleRaffle(web3, account, balance, miningTokenContract, refreshBalance)}
                >
                    PLAY
                </button>
            </div>
        </div>
    );
}

// Export
export default Raffle;