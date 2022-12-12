// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./LegaCollection.sol";

contract CollectionFactory is Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum TypeCollection{
        Tokenise,
        Object
    }

    struct Collection{
        TypeCollection type_;
        string name;
        string symbol;
        bool isOwned;
    }

    // one donator with some collection address unique who have collection unique

    mapping(address => mapping(address=>Collection)) _collections;
    // mapping(address=>Owner) _owners;

    event CollectionCreated(TypeCollection _type,
                            uint _id, 
                            address _owner,
                            string _name,
                            string _symbol,
                            uint _quantity ,
                            address _collectionAddress, 
                            uint _timestamp);

    constructor()Ownable(){}
    
    // modifier onlyOwnerCollection(){
    //     require(_owners[msg.sender].collections.length() > 0 , "you're not owner" );
    // }

    function createTokenCollection(address legatee, string memory name, string memory symbol)external returns(address){

        address security = owner();

        LegaCollection legaCollection = new LegaCollection(security ,msg.sender,legatee,name, symbol);
        address addressContract =  address(legaCollection);
        _tokenIds.increment();
        uint256 newCollectionId = _tokenIds.current();
        _collections[msg.sender][addressContract] = Collection(TypeCollection.Tokenise,name,symbol,true);
        //_owners[msg.sender] = Owner(collection.push(Collection(TypeCollection.Tokenise,name,symbol)));
        
        emit CollectionCreated(TypeCollection.Tokenise , 
                                            newCollectionId,
                                            msg.sender,
                                            name,
                                            symbol,
                                            1, 
                                            addressContract,  
                                            block.timestamp);

        return addressContract;

    }


    function getOneCollection(address addr)external view returns( Collection memory){
       require(_collections[msg.sender][addr].isOwned,"you're not owned");
       return _collections[msg.sender][addr];
        
    }
 

}