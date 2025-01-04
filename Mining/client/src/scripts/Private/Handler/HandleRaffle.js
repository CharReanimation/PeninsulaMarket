/**
 * Handles the Raffle logic for the Raffle
 * @param {string} account - User's Account Address
 * @param {BigInt} balance - User's current Balance as a BN object
 * @param {Object} miningTokenContract - MiningToken Contract
 * @param {Function} refreshBalance - Function to refresh user's balance
 * @returns {Promise<void>}
 */
// Required: web3, account, balance, miningTokenContract, refreshBalance
export const HandleRaffle = async (web3, account, balance, miningTokenContract, refreshBalance) => {
    // Variables
    const RANDOM_MAX = 500;
    const RANDOM_MIN = 50;
    const RAFFLE_REWARD = Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN + 1)) + RANDOM_MIN; // 50 - 500
    const RAFFLE_LOST = 100;

    let randomNumbers = { num1: 0, num2: 0 };
    let comparisonResult = null;

    // Generate Random Numbers
    const generateRandomNumbers = () => {
        const num1 = Math.floor(Math.random() * 100); // 0 - 99
        const num2 = Math.floor(Math.random() * 100);
        randomNumbers = { num1, num2 };

        // Calculate Hash
        const hash1 = calculateHash(balance, num1);
        const hash2 = calculateHash(balance, num2);
        comparisonResult = hash1 > hash2 ? true : hash1 < hash2 ? false : null;
    };

    // Calculate Hash
    const calculateHash = (balance, randomNum) => {
        const input = `${balance}_${randomNum}`;
        // Generate Hash Value
        const hash = web3.utils.soliditySha3({ type: "string", value: input });
        if (!hash || !hash.startsWith("0x")) {
            console.error("Invalid hash value:", hash);
            throw new Error("Invalid hash for BN conversion");
        }

        // Log: Hash
        console.log("\nHash: ", hash);
        return (`0x${hash}`); // To BigInt
    };

    try {
        // Check MiningToken Contract
        if (!miningTokenContract) {
            console.error("\n Mining Token Contract Missed!!!\n");
            return;
        }

        // Generate Random Numbers
        generateRandomNumbers();

        // Win
        if (comparisonResult && (comparisonResult != null)) {
            // Method: _addBalance(address account, uint256 amount)
            await miningTokenContract.methods.raffle_win(account, RAFFLE_REWARD).send({ from: account, gas: 300000 });
            alert(`YOU WIN!! Reward: ${RAFFLE_REWARD}`);
        }
        else {
            if (balance >= RAFFLE_LOST) {
                await miningTokenContract.methods.raffle_lose(account, RAFFLE_LOST).send({ from: account, gas: 300000 });
                alert(`YOU LOSE 100 TOKENS!!`);
            }
            else {
                alert(`NO ENOUGH BALANCE!!`);
            }
        }

        // Refresh Balance
        if (refreshBalance) {
            refreshBalance();
        }

    } catch (error) {
        console.error("Raffle Failed:", error);
        alert("Failed to perform Raffle. Please try again!");
    }
};