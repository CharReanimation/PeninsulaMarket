import BN from "bn.js"; // BigInt

/**
 * Handles the Transfer logic for the TokenTransfer
 * @param {string} recipient - Address of recipient
 * @param {number} amount - Amount of Tokens Transfer
 * @param {Object} tokenTransferContract - Token Trasnfer Contract
 * @param {string} account - User's Account Address
 * @param {BigInt} balance - User's current Balance as a BN object
 * @param {Function} refreshBalance - Function to refresh user's balance
 * @returns {Promise<void>}
 */
export const HandleTokenTransfer = async (recipient, amount, tokenTransferContract, account, refreshBalance) => {
    try {
        // Contract: TokenTransfer
        // Method: transferTokens(address recipient, uint256 amount)
        await tokenTransferContract.methods.transferTokens(recipient, amount).send({ from: account });

        // Refresh Balance
        if (refreshBalance) {
            refreshBalance();
        }
    } catch (error) {
        console.error("Token Transfer Failed:", error);
        alert("Failed to TRANSFER TOKEN. Please try again.");
    }
}