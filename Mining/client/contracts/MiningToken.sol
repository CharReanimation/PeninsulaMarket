// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiningToken {
    mapping(address => uint256) public balances; // Address, Balance
    mapping(bytes32 => bool) private usedHashes; // Hashes, Boolean
    uint256 public constant REWARD = 100; // Mining Reward: 100 token each time successed
    uint256 public constant DIFFICULTY = 2 ** 250; // Mining Difficulty: Super EZ

    // Events
    event MiningAttempt(
        address indexed miner,
        uint256 nonce,
        bytes32 hash,
        bool success
    );
    event MiningSuccess(address indexed miner, uint256 reward);

    // Calculate the hash and check difficulty
    function calculateHash(
        address miner,
        uint256 nonce
    ) public pure returns (bytes32, bool) {
        bytes32 hash = keccak256(abi.encodePacked(miner, nonce));
        bool isValid = uint256(hash) < DIFFICULTY;
        // Return: hash, isValid
        return (hash, isValid);
    }

    // Mining: Read & Write
    function mine(uint256 nonce) public {
        // Calculate Hash
        (bytes32 hash, bool isValid) = calculateHash(msg.sender, nonce);

        // Emit an event for the mining attempt
        emit MiningAttempt(msg.sender, nonce, hash, isValid);

        // Check if Hash less than difficulty && Hash Not used
        require(!usedHashes[hash] && isValid, "Invalid hash or difficulty");

        // Mark hash as used
        usedHashes[hash] = true;

        // Add Balance: Reward
        _addBalance(msg.sender, REWARD);

        // Emit a success event
        emit MiningSuccess(msg.sender, REWARD);
    }

    // Raffle: Win
    function raffle_win(address account, uint256 amount) public {
        // Add Balance
        _addBalance(account, amount);
    }

    // Raffle: lose
    function raffle_lose(address account, uint256 amount) public {
        // Sub Balance
        _subBalance(account, amount);
    }

    // Check Balance: Read Only
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // Internal: Add Balance
    function _addBalance(address account, uint256 amount) internal {
        balances[account] += amount;
    }

    // Internal: Subtract Balance
    function _subBalance(address account, uint256 amount) internal {
        require(balances[account] >= amount, "Insufficient balance");
        balances[account] -= amount;
    }

    // Test Hash
    function testHash(
        address account,
        uint256 nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(account, nonce));
    }

    // Test Account
    function testAccount(address account) public pure returns (address) {
        return account;
    }

    // Test Nonce
    function testNonce(uint256 nonce) public pure returns (uint256) {
        return nonce;
    }

    // Transfer
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        require(balances[sender] >= amount, "Insufficient balance");
        balances[sender] -= amount;
        balances[recipient] += amount;
        return true;
    }
}
