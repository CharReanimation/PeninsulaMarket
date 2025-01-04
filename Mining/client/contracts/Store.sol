// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface: IMiningToken
interface IMiningToken {
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

// Store
contract Store {
    address public owner;
    IMiningToken public miningToken;

    event ItemPurchased(address indexed buyer, uint256 amount);

    constructor(address miningTokenAddress) {
        owner = msg.sender;
        miningToken = IMiningToken(miningTokenAddress);
    }

    // Check Only Onwer
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Check Balance
    modifier hasSufficientBalance(address user, uint256 amount) {
        // Makesure user has sufficient balance: return true
        require(
            miningToken.balanceOf(user) >= amount,
            "Insufficient balance in MiningToken"
        );
        _;
    }

    // Purchase an item using MiningToken balance: Address -> Store
    function purchaseItem(
        uint256 amount
    ) external hasSufficientBalance(msg.sender, amount) {
        // Transfer MiningToken from buyer to the contract
        require(
            miningToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        emit ItemPurchased(msg.sender, amount);
    }

    // Withdraw MiningToken funds from the contract: Store -> Address
    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        // Only Owner can perform
        require(
            miningToken.transferFrom(address(this), to, amount),
            "Token withdrawal failed"
        );
    }

    // Retrieve the contract MiningToken balance
    function getContractTokenBalance() external view returns (uint256) {
        return miningToken.balanceOf(address(this));
    }
}
