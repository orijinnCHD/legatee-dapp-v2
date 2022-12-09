// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// importing the ERC-721 contract to deploy for an artist

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./LegaCollection.sol";
//  import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. S/O @Snow
  * @dev    If the contract is already deployed for an _artistName, it will revert.
  */
contract CollectionFactory is Ownable {
    
  using Counters for Counters.Counter;
  Counters.Counter private _collectionIds;

  enum TypeCollection{
    Tokenise,
    Object
  }

  mapping(TypeCollection => mapping(uint=>address)) collections;

  event CollectionCreated(TypeCollection indexed _type, 
                            string _name,uint _quantity ,
                            address indexed _collectionAddress,
                            uint _timestamp);

  constructor()Ownable(){}

  function createLegaCollection(address _donator, 
                                address _legatee, 
                                string calldata _name, 
                                string calldata _symbol)
                                external returns (address){

    LegaCollection collection = new LegaCollection( _donator,_legatee,_name, _symbol);
    address addressContract =  address(collection);
    _collectionIds.increment();
    uint256 newCollectionId = _collectionIds.current();
    collections[TypeCollection.Tokenise][newCollectionId] = addressContract;
    emit CollectionCreated(TypeCollection.Tokenise, _name,1, addressContract,  block.timestamp);

    return addressContract;

  }

   


  // function createERC1155Collection(address _donator, address _legatee, string calldata _name, string calldata _symbol)external onlyOwner returns (address){

  // }
  // function createNFTCollection(string calldata _name,string calldata_symbol,uint _quantity)external returns (address){
      
  // }
}