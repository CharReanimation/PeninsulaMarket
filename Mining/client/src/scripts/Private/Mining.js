import React, { useState, useEffect } from "react"; // React
import BN from "bn.js"; // BigInt

// Config
import { miningAbi, miningTokenContractAddress } from "../Config/contractConfig";

// Hooks
import useWeb3 from "../Hooks/Contract/useWeb3";
import useAccount from "../Hooks/useAccount"; // Required: miningAbi, miningContractAddress
import useMiningContract from "../Hooks/Contract/useMiningContract"; // Required: web3, miningAbi, miningContractAddress

// Handler
import { HandleMiningToken } from "./Handler/HandleMiningToken"; // Required: miningTokenContract, validNonce, standardizedAccount

// CSS
import "../../css/Public/Global.css";
import "../../css/Private/Mining.css";

// Mining
const Mining = () => {
  // Mining Contract Var
  let [nonce, setNonce] = useState(0); // User Input Number
  const [lastNonce, setLastNonce] = useState(0);
  const [usedNonces, setUsedNonces] = useState([]);

  const [miningTimes, setMiningTimes] = useState(1000);
  const [isMining, setIsMining] = useState(false);
  const [stopMiningFlag, setStopMiningFlag] = useState(false);

  // Hooks
  const web3 = useWeb3(); // Use web3
  const { account, balance, refreshBalance } = useAccount(miningAbi, miningTokenContractAddress); // Use Account
  const { miningTokenContract, difficulty, reward } = useMiningContract(web3, miningAbi, miningTokenContractAddress); // Use Mining Contract


  // Force Refresh Balance
  useEffect(() => {
    if (refreshBalance) {
      refreshBalance();
    }
  }, [refreshBalance]);

  // Listener
  useEffect(() => {
    if (!miningTokenContract) {
      console.log("Contract is not initialized yet.");
      return;
    }

    // Attempt
    const miningAttemptListener = miningTokenContract.events.MiningAttempt({}, (error, event) => {
      if (!error) {
        const { miner, nonce, hash, success } = event.returnValues;
        console.log(`Mining Attempt: Miner=${miner}, Nonce=${nonce}, Hash=${hash}, Success=${success}`);
      }
    });

    // Success
    const miningSuccessListener = miningTokenContract.events.MiningSuccess({}, (error, event) => {
      if (!error) {
        const { miner, reward } = event.returnValues;
        alert(`Mining successful! Miner=${miner}, Reward=${reward}`);
        // Update Balance
        refreshBalance();
      }
    });

    // Clear Listener
    return () => {
      miningAttemptListener.unsubscribe();
      miningSuccessListener.unsubscribe();
    };
  }, [miningTokenContract, refreshBalance]);


  // Find Nonce
  const findValidNonce = async () => {
    let endingCount = 0; // Restore Ending
      // Log: Start Mining
      console.log("\n------ Start Mining ------\n\n")

    while (true) {
      // Log: Current Mining
      console.log("\n------ Current Mining:",endingCount ,"------")
      // Stop Mining
      if (stopMiningFlag || endingCount == miningTimes) {
        setLastNonce(nonce);
        console.log("\nMining Finished: Mining stopped by user!\nEnding Count: ", endingCount);
        throw new Error("Mining Stopped By USER"); // Mining Stopped By USER
      }

      // Generate a random Nonce
      do {
        nonce = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      } while (usedNonces.includes(nonce));

      // Add nonce to used list
      setUsedNonces((prev) => [...prev, nonce]);

      // Generate Hash Value
      const hash = web3.utils.soliditySha3(
        { type: "address", value: web3.utils.toChecksumAddress(account) },
        { type: "uint256", value: nonce }
      );

      // Hash to Uint256
      const hashBN = new BN(hash.slice(2), 16);
      const difficultyBN = new BN(difficulty.toString());

      // Log: Nonce, Hash, HashBN
      console.log(
        `Nonce: ${nonce}\nHash: ${hash}\nHashBN: ${hashBN.toString()}\n------ ------ ------ ------\n\n`
      );

      // Update Nonce
      setNonce(nonce);

      // Compare
      if (hashBN.lt(difficultyBN)) {
        console.log(`Mining Success: Nonce ${nonce}`);
        setLastNonce(nonce); // Record successful Nonce
        console.log("Last Nonce: ", nonce);
        return nonce; // Stop mining and return the successful nonce
      }

      endingCount++;

      await new Promise(resolve => setTimeout(resolve, 0)); // Interval
    }
  }


  // Handle Mining
  const handleMine = async () => {
    try {
      // Reset Stop
      setStopMiningFlag(false);

      // Find Nonce
      const validNonce = await findValidNonce();
      console.log("\nType of validNonce: ", typeof validNonce);
      const bigNonce = validNonce.toString();
      console.log("Type of bigNonce: ", typeof bigNonce);

      // Validate Nonce
      if (isNaN(validNonce)) {
        console.error("Invalid nonce:", validNonce);
        alert("Invalid nonce generated.");
        return;
      }
      else {
        console.log("Found valid nonce:", validNonce);
      }


      // Checking Account, Nonce, and Hash Consistency
      const standardizedAccount = web3.utils.toChecksumAddress(account);
      console.log("\n Type of standardizedAccount: ", typeof(standardizedAccount));

      // Solidity Account (from testAccount)
      const solidityAccount = await miningTokenContract.methods.testAccount(account).call();
      console.log("\nSolidity Account:", solidityAccount);
      console.log("Frontend Account (Standardized):", standardizedAccount);

      if (solidityAccount.toLowerCase() !== standardizedAccount.toLowerCase()) {
        console.error("Account mismatch! Solidity Account and Frontend Account do not match.");
        alert("Account mismatch! Please check the account value.");
        return;
      }

      // Solidity Nonce (from testNonce)
      const solidityNonce = await miningTokenContract.methods.testNonce(validNonce).call();
      console.log("\nType of solidityNonce: ", typeof(solidityNonce));
      console.log("Solidity Nonce:", solidityNonce);
      console.log("Frontend Nonce:", validNonce);

      if (parseInt(solidityNonce) !== parseInt(bigNonce)) {
        console.error("Nonce mismatch! Solidity Nonce and Frontend Nonce do not match.");
        alert("Nonce mismatch! Please check the nonce value.");
        return;
      }

      // Hash Verification
      const testHash = await miningTokenContract.methods.testHash(standardizedAccount, bigNonce).call();
      const frontendHash = web3.utils.soliditySha3(
        { type: "address", value: standardizedAccount },
        { type: "uint256", value: bigNonce }
      );

      console.log("Solidity Hash:", testHash);
      console.log("Frontend Hash:", frontendHash);

      // Mismatch
      if (testHash !== frontendHash) {
        console.error("Hash mismatch! Solidity Hash and Frontend Hash do not match.");
        alert("Hash mismatch! Please check your hash implementation.");
        return;
      }

      console.log("All checks passed! Account, Nonce, and Hash are consistent.");



      // Call Contract Method: Mining
      try {
        await HandleMiningToken(miningTokenContract, validNonce, standardizedAccount);
        // alert("Mining successful!");
      } catch (error) {
        console.error("Mining failed:", error);
      }

      // Update Balance
      await miningTokenContract.methods.balanceOf(account).call();
      refreshBalance();
    } catch (error) {
      console.error("Mining failed:", error.message);
      alert("Mining failed! Please try again.");
    } finally {
      setIsMining(false); // Always set mining state back to false
    }
  };


  // Start Mining
  const startMining = () => {
    setIsMining(true);
    handleMine();
  };

  // Stop Mining
  const stopMining = () => {
    setStopMiningFlag(true);
    setIsMining(false);
  };

  return (
    <div className="global-page">
      <div id="mining-container-data">
        <h1 id="mining-h1">MINING</h1>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Mining Difficulty: EZ</p>
        <p>Reward Per Block: {reward}</p>
        <p>Current Mining Nonce: {nonce}</p>
        {/* Set Mining Times */}
        <form>
          <label>Enter your Mining Times:
            <input
              id="mining-input"
              type="number"
              value={miningTimes}
              onChange={(e) => setMiningTimes(e.target.value)}
            />
          </label>
        </form>

        {/* Start Mining */}
        <button className="mining-btn" onClick={startMining} disabled={isMining}>
          {isMining ? "Mining in progress..." : "Start Mining"}
        </button>

        {/* Stop Mining */}
        <button className="mining-btn" onClick={stopMining} disabled={!isMining}>
          Stop Mining
        </button>
      </div>
    </div>
  );
};

// Export
export default Mining;