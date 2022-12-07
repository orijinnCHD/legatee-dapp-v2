// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// importing the ERC-721 contract to deploy for an artist
import "./CollectionERC721.sol";
//  import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. S/O @Snow
  * @dev    If the contract is already deployed for an _artistName, it will revert.
  */
contract CollectionFactory{
    
    enum Collection{
        legaCollection,
        objectCollection
    }

    event NFTCollectionCreated(Collection _collection, string _artistName, address _collectionAddress, uint _timestamp); 


    function createCollection(string calldata _name, string calldata _symbol)external returns (address){

        CollectionERC721 collection = new CollectionERC721( _name, _symbol);
        emit NFTCollectionCreated( Collection.legaCollection, _name, address(collection), block.timestamp);
        return address(collection);

    }
}