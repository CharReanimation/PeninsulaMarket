import { useState, useEffect } from "react"; // React

// Required: web3, miningAbi, miningContractAddress
const useMiningContract = (web3, miningAbi, miningTokenContractAddress) => {
    const [miningTokenContract, setMiningTokenContract] = useState(null);
    const [difficulty, setDifficulty] = useState(0);
    const [reward, setReward] = useState(0);

    useEffect(() => {
        if (web3 && miningAbi && miningTokenContractAddress) {
            // Set Contract: MiningToken
            const contractInstance = new web3.eth.Contract(miningAbi, miningTokenContractAddress);
            setMiningTokenContract(contractInstance);

            // Fetch Contract State
            const fetchContractState = async () => {
                try {
                    const currentDifficulty = await contractInstance.methods.DIFFICULTY().call(); // Contract MiningToken: Difficulty
                    const currentReward = await contractInstance.methods.REWARD().call(); // Contract MiningToken: Reward
                    setDifficulty(currentDifficulty);
                    setReward(currentReward);
                } catch (error) {
                    console.error("Error fetching MiningToken state:", error);
                }
            };

            fetchContractState();
        }
    }, [web3, miningAbi, miningTokenContractAddress]);

    // Return: miningTokenContract, difficulty, reward
    return { miningTokenContract, difficulty, reward };
};

// Export
export default useMiningContract;