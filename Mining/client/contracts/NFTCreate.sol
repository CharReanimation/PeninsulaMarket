// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// NFTCreate
contract NFTCreate is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Constructor
    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT(
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        // Create a new NFT
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter++; // Make sure Next Creating NFT ID is unique

        // Return
        return newTokenId;
    }
}
