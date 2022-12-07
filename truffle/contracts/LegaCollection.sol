// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract LegaCollection is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
 
    // one nft for address with message
    // and one nft for heritage person

    constructor(string memory name_,string memory symbol_) ERC721 (name_, symbol_) Ownable() {}

    function mint(string memory _tokenURI)external onlyOwner returns(uint){
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender,newItemId);
        //_mint(_to, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return(newItemId);

    }

    function getCount()external view returns(uint){
        return _tokenIds.current();
    }
}