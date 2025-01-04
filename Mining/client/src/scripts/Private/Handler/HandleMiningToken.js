/**
 * Handles the Mining Token logic for the Misning Token Contract
 * @param {Object} miningTokenContract - Mining Token Contract
 * @param {number} validNonce - Generated Valid Nonce
 * @param {string} standardizedAccount - Standarized User's Account
 * @returns {Promise<void>}
 */

export const HandleMiningToken = async (miningTokenContract, validNonce, standardizedAccount) => {
    // Variables
    const gasLimit = 300000;

    try {
        await miningTokenContract.methods.mine(validNonce).send({ from: standardizedAccount, gas: gasLimit });
    } catch (error) {
        console.error("Mining Token Failed:", error);
        alert("Failed to MINING TOKEN. Please try again.");
    }
}