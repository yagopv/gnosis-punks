// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Import extendable ERC721
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

// Import utility for defining functions only the owner can use. The deployer
import '@openzeppelin/contracts/access/Ownable.sol';

contract GnosisPunksNFT is ERC721, Ownable {
  uint256 public mintPrice;
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;
  bool public isPublicMintEnabled;
  string internal baseTokenUri;
  address payable public withdrawWallet;
  mapping(address => uint256) public walletMints;

  // Constructor
  constructor() payable ERC721('GnosisPunks', 'GP') {
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;

    // set withdraw wallet address
  }

  function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
    isPublicMintEnabled = _isPublicMintEnabled;
  }

  function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
    baseTokenUri = _baseTokenUri;
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), 'Token does not exist!');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
  }

  function withdraw() external onlyOwner {
    (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
    require(success, 'Withdraw failed!');
  }

  function mint(uint256 _quantity) public payable {
    require(isPublicMintEnabled, 'Public minting is disabled!');
    require(msg.value == _quantity * mintPrice, 'Minting price is not correct!');
    require(totalSupply + _quantity <= maxSupply, 'Max supply reached!');
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Max per wallet reached!');
    
    for (uint256 i = 0; i < _quantity; i++) {
      uint256 tokenId = totalSupply + 1;
      totalSupply++;      
      _safeMint(msg.sender, tokenId);
    }     
  }
}

