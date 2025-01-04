import { useState, useEffect } from "react"; // React

// Hooks
import useWeb3 from "./Contract/useWeb3";
import useMiningContract from "./Contract/useMiningContract"; // Required: web3, miningAbi, miningTokenContractAddress


// Required: miningAbi, miningTokenContractAddress
const useAccount = (miningAbi, miningTokenContractAddress) => {
  const [account, setAccount] = useState(""); // Account
  const [balance, setBalance] = useState(0); // Balance

  // Hooks
  const web3 = useWeb3(); // Use Web3
  const { miningTokenContract } = useMiningContract(web3, miningAbi, miningTokenContractAddress); // Use Mining Contract

  useEffect(() => {
    // Initalize： web3, account, balance
    const fetchAccountData = async () => {

      //if (window.ethereum) {
      // const web3Instance = new Web3(window.ethereum);
      // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      // Web3 not initialized
      if (!web3) {
        return;
      }

      try {
        const accounts = await web3.eth.getAccounts(); // Web3: Get Accounts
        setAccount(accounts[0]);
        //}

        // Use Minging Contract: Get Balance
        if (miningTokenContract) {
          // Get Initalize Balance
          const initialBalance = await miningTokenContract.methods.balanceOf(account).call(); // Contract MiningToken: Get Balance
          setBalance(initialBalance);
        }
      } catch (error) {
        console.error("Error initializing account:", error);
      }
    };

    fetchAccountData();
  }, [web3]); // Update: web3 initialized

  // Update Balance
  const refreshBalance = async () => {
    if (miningTokenContract && account) {
      try {
        // Update Balance: Contract -> Frontend
        const updatedBalance = await miningTokenContract.methods.balanceOf(account).call();
        setBalance(updatedBalance);
      } catch (error) {
        console.error("Error refreshing balance:", error);
      }
    }
  };

  // Return: web3, account, balance, refreshBalance
  return { account, balance, refreshBalance };
};

export default useAccount;
