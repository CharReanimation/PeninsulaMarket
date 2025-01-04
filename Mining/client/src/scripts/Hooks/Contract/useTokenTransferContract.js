import { useState, useEffect } from "react"; // React

// Required: web3, tokenTransferAbi, tokenTransferContractAddress, miningTokenContract
const useTokenTransferContract = (web3, tokenTransferAbi, tokenTransferContractAddress, miningTokenContract) => {
    // Contract: TokenTransfer
    const [tokenTransferContract, setTokenTransferContract] = useState(null);

    useEffect(() => {
        if (web3 && tokenTransferAbi && tokenTransferContractAddress) {
            // Set Contract: TokenTransfer
            const contractInstance = new web3.eth.Contract(tokenTransferAbi, tokenTransferContractAddress,);
            setTokenTransferContract(contractInstance);
        }
    }, [web3, tokenTransferAbi, tokenTransferContractAddress, miningTokenContract]);

    // Return tokenTransferContract
    return { tokenTransferContract };
};

// Export
export default useTokenTransferContract;