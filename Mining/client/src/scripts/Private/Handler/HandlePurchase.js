import BN from "bn.js"; // BigInt

/**
 * Handles the Purchase logic for the Store
 * @param {Object} song - Song details (includes cost)
 * @param {Object} storeContract - Store Contract
 * @param {string} account - User's Account Address
 * @param {BigInt} balance - User's current Balance as a BN object
 * @param {Function} refreshBalance - Function to refresh user's balance
 * @returns {Promise<void>}
 */
// Required: song, storeContract, account, balance, refreshBalance
export const HandlePurchase = async (song, storeContract, account, balance, refreshBalance) => {
    try {
        if (!storeContract) {
            console.error("\n Store Contract Missed!!!\n");
            return;
        }

        const costBN = new BN(song.cost); // Convert cost: number to BN
        const balanceBN = new BN(balance.toString()); // Convert balance: BigInt to BN

        // Check if balance is sufficient
        if (!balanceBN.gte(costBN)) {
            alert("Insufficient Balance to make this Purchase!");
            return;
        }

        // Contract: Purchase
        // Method: purchaseItem(unint256 amount)
        await storeContract.methods.purchaseItem(song.cost).send({ from: account });

        // Refresh Balance
        if (refreshBalance) {
            refreshBalance();
        }

        alert(`You purchased "${song.title}" for ${song.cost} tokens!`);
    } catch (error) {
        console.error("Purchase failed:", error);
        alert("Failed to complete purchase. Please try again.");
    }
};
