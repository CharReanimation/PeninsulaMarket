import { useState, useEffect } from "react"; // React
import Web3 from "web3"; // Web3

const useWeb3 = () => {
    // web3
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        // Initalize： web3
        const initWeb3 = async () => {
            try {
                const web3Instance = new Web3("http://127.0.0.1:8545"); // Web3 Instance
                console.log("Web3 instance created!");
                setWeb3(web3Instance);
            } catch (error) {
                console.error("Error initializing web3:", error);
            }
        };

        initWeb3();
    }, []);

    return web3;
};

// Export
export default useWeb3;