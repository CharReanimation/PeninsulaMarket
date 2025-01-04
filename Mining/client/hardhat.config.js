require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter"); // Gas Reporter

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: "0.8.28",
  networks: {
    hardhat: {
      gas: 50000000,
      blockGasLimit: 50000000,
    },
  },

  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 20, // Gas Price, Gwei
    token: "ETH",
    outputFile: "gas-report.txt", // Save To File
    noColors: true,
  }
};
