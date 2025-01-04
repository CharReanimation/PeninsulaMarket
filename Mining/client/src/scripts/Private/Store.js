import React, { useState, useEffect } from "react"; // React

// Config
import { miningAbi, miningTokenContractAddress, storeAbi, storeContractAddress } from "../Config/contractConfig";

// Hook
import useWeb3 from "../Hooks/Contract/useWeb3";
import useAccount from "../Hooks/useAccount"; // Required: miningAbi, miningTokenContractAddress
import useMiningContract from "../Hooks/Contract/useMiningContract"; // Required: web3, miningAbi, miningTokenContractAddress
import useStoreContract from "../Hooks/Contract/useStoreContract"; // Required: web3, storeAbi, storeContractAddress, miningTokenContract

// Handler
import { HandlePurchase } from "./Handler/HandlePurchase"; // Required: song, storeContract, account, balance, refreshBalance


// CSS
import "../../css/Public/Global.css";
import "../../css/Private/Store.css";

// Store
const Store = () => {
    // Hooks
    const web3 = useWeb3(); // Use Web3
    const { account, balance, refreshBalance } = useAccount(miningAbi, miningTokenContractAddress); // Use Account
    const { miningTokenContract } = useMiningContract(web3, miningAbi, miningTokenContractAddress); // Use Mining Contract
    const { storeContract } = useStoreContract(web3, storeAbi, storeContractAddress, miningTokenContract); // Use Store Contract

    // Force Refresh Balance
    useEffect(() => {
        if (refreshBalance) {
            refreshBalance();
        }
    }, [refreshBalance]);


    // List of music shows
    const [songs] = useState([
        {
            title: "Premeditated",
            artist: "CharreA",
            src: "/music_data/song/CharreA - Premeditated.mp3",
            cover: "/music_data/img/Premeditated.png",
            youtube: "https://www.youtube.com/watch?v=AI31fP7Tg4Q",
            cost: 400
        },

        {
            title: "The Ultimatum",
            artist: "CharreA",
            src: "/music_data/song/CharreA - The Ultimatum.mp3",
            cover: "/music_data/img/TheUltimatum.png",
            youtube: "https://www.youtube.com/watch?v=wdY_T1FTZpw",
            cost: 600
        },

        {
            title: "Reanimated Will",
            artist: "CharreA",
            src: "/music_data/song/CharreA - Reanimated Will.mp3",
            cover: "/music_data/img/ReanimatedWill.png",
            youtube: "https://www.youtube.com/watch?v=3oLwR8XK8HE",
            cost: 450
        },

        {
            title: "Gleam Maniac",
            artist: "CharreA",
            src: "/music_data/song/CharreA - Gleam Maniac.mp3",
            cover: "/music_data/img/GleamManiac.png",
            youtube: "https://www.youtube.com/watch?v=_EUqw5n76z4",
            cost: 500
        },

        {
            title: "Gleam Chaos",
            artist: "CharreA",
            src: "/music_data/song/CharreA - Gleam Chaos.mp3",
            cover: "/music_data/img/GleamChaos.png",
            youtube: "https://www.youtube.com/watch?v=11sMga-WiqY",
            cost: 350
        },
    ]);

    // Return: HTML
    return (
        <div className="global-page">
            {/* Store Title */}
            <div id="store-title">
                <h2 className="store-title-h2">MUSIC STORE</h2>
                <p className="store-balance">Your Balance: <strong>{balance} Tokens</strong></p>
            </div>

            <div className="store-container">
                <div className="songs-container">
                    {songs.map((song, index) => (
                        <div key={index} className="song-card">
                            <img
                                src={song.cover}
                                alt={`${song.title} cover`}
                                className="song-cover-img"
                                onClick={() => window.open(song.youtube, "_blank")}
                            />
                            <h2 className="song-title">{song.title}</h2>
                            <p className="song-artist">{song.artist}</p>
                            <p className="song-cost">Cost: {song.cost} Tokens</p>

                            {/* Buttons */}
                            <div className="song-buttons">
                                {/* Purchase */}
                                <button
                                    onClick={() => HandlePurchase(song, storeContract, account, balance, refreshBalance)}
                                    className="home-purchase-button"
                                >
                                    Purchase
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Export
export default Store;