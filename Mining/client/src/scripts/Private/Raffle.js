import React, { useState, useEffect, useRef } from "react"; // React

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

    // States
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Toggle Play Music
    const togglePlayMusic = () => {
        // Check Video Reference
        if (videoRef.current) {
            // Toggle Play Music
            if (isPlaying) {
                videoRef.current.pause(); // Pause
            } else {
                videoRef.current.play(); // Play
            }

            // Update States
            setIsPlaying(!isPlaying);

            // Log: Muted & Play
            console.log("\n Play: ", isPlaying);
        }
    };


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
                    <video ref={videoRef} loop id="background-video" className="raffle-video">
                        <source src="/music_data/music_video/GleamHypedTest.MP4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div id="raffle-container-data">
                    <div id="raffle-container-data-inner">
                        <div className="raffle-container-inner-items">
                            <h1 className="raffle-h1">
                                <strong>BALANCE</strong>
                            </h1>

                            <h2 className="raffle-h2">
                                <strong>{balance} TOKENS</strong>
                            </h2>
                        </div>
                        <div className="raffle-container-inner-items">
                            <button onClick={togglePlayMusic} className="raffle-btn">
                                {isPlaying ? "PAUSE" : "PLAY"}
                            </button>
                            <button
                                className="raffle-btn"
                                onClick={() => HandleRaffle(web3, account, balance, miningTokenContract, refreshBalance)}
                            >
                                RAFFLE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export
export default Raffle;