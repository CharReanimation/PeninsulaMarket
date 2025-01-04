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

// TokenTransfer
contract TokenTransfer {
    IMiningToken public miningToken;

    // Event for successful transfer
    event Transfer(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );

    // Constructor to set the MiningToken Contract address
    constructor(address miningTokenAddress) {
        require(
            miningTokenAddress != address(0),
            "Invalid token contract address"
        );
        miningToken = IMiningToken(miningTokenAddress);
    }

    /**
     * @notice Transfers tokens from the caller to the recipient.
     * @param recipient The address to receive the tokens.
     * @param amount The number of tokens to transfer.
     */
    // Transfer Tokens: Sender -> Recipient
    function transferTokens(address recipient, uint256 amount) external {
        // Check Recipient Adress
        require(recipient != address(0), "Recipient address cannot be zero");

        // Check Transfer Amount
        require(amount > 0, "Transfer amount must be greater than zero");

        // Check Sender Balance
        uint256 senderBalance = miningToken.balanceOf(msg.sender); // Get From MiningToken
        require(senderBalance >= amount, "Insufficient balance");

        // Check Transaction Success
        bool success = miningToken.transferFrom(msg.sender, recipient, amount);
        require(success, "Token transfer failed");

        emit Transfer(msg.sender, recipient, amount);
    }
}
