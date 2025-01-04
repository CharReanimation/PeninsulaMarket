import { useState, useEffect } from "react"; // React

// Required: web3, NFTCreateAbi, NFTCreateContractAddress
const useNFTCreateContract = (web3, NFTCreateAbi, NFTCreateContractAddress) => {
    // Contract: NFTCreate
    const [NFTCreateContract, setNFTCreateContract] = useState(null);

    useEffect(() => {
        if (web3 && NFTCreateAbi && NFTCreateContractAddress) {
            // Set Contract: NFTCreate
            const contractInstance = new web3.eth.Contract(NFTCreateAbi, NFTCreateContractAddress,);
            setNFTCreateContract(contractInstance);
        }
    }, [web3, NFTCreateAbi, NFTCreateContractAddress]);

    // Return NFTCreateContract
    return { NFTCreateContract };
};

// Export
export default useNFTCreateContract;