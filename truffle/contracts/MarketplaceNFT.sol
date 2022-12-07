// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";


contract MarketplaceNFT is ReentrancyGuard{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable public  feeAccount;
    uint public  feePercent;

    struct Item{
        IERC721 nft; // instance du nft contract
        uint256 ItemId;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool sold;

    }

    event Offered(
        address indexed nft,
        uint itemId,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought(
        address indexed nft,
        address indexed seller,
        address indexed buyer,
        uint itemId,
        uint tokenId,
        uint price
    );

    mapping(uint => Item) public items;

    constructor(uint _feePercent){
        feeAccount=payable(msg.sender);
        _feePercent=_feePercent;
    }

    function createItem(IERC721 _nft, uint _tokenId, uint _price)external nonReentrant{
        require(_price > 0 ,"price must be greatern than zero");

        _tokenIds.increment();
        uint256 itemCount = _tokenIds.current();

        // transfer de la personne connecté à la marketplace
        // on transfer une instance de nft (IERC721)
        _nft.transferFrom(msg.sender,address(this),_tokenId);

        items[itemCount] = Item (
            _nft,
            itemCount,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit Offered(address(_nft),itemCount,_tokenId,_price,msg.sender);
    
    }

    function purchaseItem(uint _itemId)external payable nonReentrant{
        
        uint256 itemCount = _tokenIds.current();
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        
        uint256 totalPrice = getTotalPriceItem(_itemId);
        Item storage item = items[_itemId];

        require(msg.value >= totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");

        // pay seller and feeAccount
        item.seller.transfer(item.price);// pay the seller
        feeAccount.transfer(totalPrice - item.price); // pay fee platform
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Bought(
            address(item.nft),
            item.seller,
            msg.sender,
            _itemId,
            item.tokenId,
            item.price
        );
    }


    // price fixed by a seller + feePercent marketplace
    function getTotalPriceItem(uint _itemId)view public returns(uint){
            return(items[_itemId].price * (100 + feePercent)/100);
    }

    function getItemCount()view public returns(uint256){
        return _tokenIds.current();
    }
    
}