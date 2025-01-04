import { useState, useEffect } from "react"; // React

// Required: web3, storeAbi, storeContractAddress, miningTokenContract
const useStoreContract = (web3, storeAbi, storeContractAddress, miningTokenContract) => {
    // Contract: Store
    const [storeContract, setStoreContract] = useState(null);

    useEffect(() => {
        if (web3 && storeAbi && storeContractAddress) {
            // Set Contract: Store
            const contractInstance = new web3.eth.Contract(storeAbi, storeContractAddress);
            setStoreContract(contractInstance);
        }
    }, [web3, storeAbi, storeContractAddress, miningTokenContract]);

    // Return storeContract, storeBalance
    return { storeContract };
};

// Export
export default useStoreContract;