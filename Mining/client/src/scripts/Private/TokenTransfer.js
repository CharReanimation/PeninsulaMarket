import React, { useState, useEffect } from "react"; // React

// Config
import { miningAbi, miningTokenContractAddress, tokenTransferAbi, tokenTransferContractAddress } from "../Config/contractConfig";

// Hook
import useWeb3 from "../Hooks/Contract/useWeb3";
import useAccount from "../Hooks/useAccount"; // Required: miningAbi, miningTokenContractAddress
import useMiningContract from "../Hooks/Contract/useMiningContract"; // Required: web3, miningAbi, miningTokenContractAddress
import useTokenTransferContract from "../Hooks/Contract/useTokenTransferContract"; // Required: web3, tokenTransferAbi, tokenTransferContractAddress, miningTokenContract

// Handler
import { HandleTokenTransfer } from "./Handler/HandleTokenTransfer"; // Required: recipient, amount, tokenTransferContract, account, balance, refreshBalance


// CSS
import "../../css/Public/Global.css";
import "../../css/Private/TokenTransfer.css";

// TokenTransfer
const TokenTransfer = () => {
    // Hooks
    const web3 = useWeb3(); // Use Web3
    const { account, balance, refreshBalance } = useAccount(miningAbi, miningTokenContractAddress); // Use Account
    const { miningTokenContract } = useMiningContract(web3, miningAbi, miningTokenContractAddress); // Use Mining Contract
    const { tokenTransferContract } = useTokenTransferContract(web3, tokenTransferAbi, tokenTransferContractAddress, miningTokenContract); // Use TokenTransfer Contract

    // State for recipient and amount
    const [recipient, setRecipient] = useState(""); // Recipient Address
    const [amount, setAmount] = useState(""); // Transfer Amount
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

    // Force Refresh Balance
    useEffect(() => {
        if (refreshBalance) {
            refreshBalance();
        }
    }, [refreshBalance]);

    // Handle form submission
    const HandleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate inputs
        if (!web3.utils.isAddress(recipient)) {
            alert("Invalid Recipient address!");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Please enter a valid amount!");
            return;
        }

        // No Enough Balance
        if (balance < amount) {
            alert("Insufficient Balance to make this Transfer!");
            return;
        }


        // Same Account
        if (account == recipient) {
            alert("OMG! I know it!!! YOU CANNOT DO THIS OK >_<");
            return;
        }


        // Confirmation prompt
        const userInput = window.prompt(
            `You are about to transfer "${amount}" TOKENS to:\n"${recipient}"\n\n ---- ---- ---- ----\n\nYou know what? Let me tell u ONE thing OK?? You cannot get back your TOKEN if u messed up!!\n\nTo Confirm, Please type "Confirm Transaction" in the input box:`
        );

        if (userInput !== "Confirm Transaction") {
            alert("Transaction Cancelled!");
            return;
        }


        // Call HandleTokenTransfer
        try {
            // Is Submitting
            setIsSubmitting(true);
            await HandleTokenTransfer(recipient, amount, tokenTransferContract, account, refreshBalance);
            alert("Token transfer successful!");
        } catch (error) {
            console.error("Token transfer failed:", error);
            alert("Token transfer failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Return: HTML
    return (
        <div className="global-page">
            <div className="token-transfer-container">
                <h1 id="token-transfer-h1">TOKEN TRANSFER</h1>
                <div id="token-transfer-data">
                    {/* Account */}
                    <h3><strong>ACCOUNT: {account}</strong></h3>

                    {/* Balance */}
                    <h3><strong>BALANCE: {balance}</strong></h3>

                    {/* Form */}
                    <form onSubmit={HandleSubmit} className="token-transfer-form-container">

                        <div className="token-transfer-form-item">
                            {/* Recipient Address */}
                            <label id="token-transfer-recipient" htmlFor="token-transfer-recipient" class="token-transfer-item-label"><h2>RECIPIENT ADDRESS</h2></label>
                            <input
                                type="text"
                                id="token-transfer-recipient"
                                className="token-transfer-input"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="Enter recipient address"
                                required
                            />
                        </div>

                        <div className="token-transfer-form-item">
                            {/* Transfer Amount */}
                            <label id="token-transfer-amount" htmlFor="token-transfer-amount" class="token-transfer-item-label"><h2>AMOUNT</h2></label>
                            <input
                                type="number"
                                id="token-transfer-amount"
                                className="token-transfer-input"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount to transfer"
                                required
                            />
                        </div>

                        <div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="token-transfer-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Transferring..." : "SEND"}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

// Export
export default TokenTransfer;