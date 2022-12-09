// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract LegaCollection is ERC721URIStorage , Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint16 time;
    uint16 constant private  totalSupply = 500;
    
    address private legatee;
    mapping( uint => address ) private donators;
    uint256 private cptDonator;

    event NFTMinted(uint _id, address indexed _donator, string  _tokenURI, uint _timeStamp);
    event TransferNewDonator(address _oldDonator, address _newDonator, uint _timeStamp);
    event BatchTokenTransfered( address indexed _from, address indexed _to, uint16[] _tokenIds,  uint _timeStamp);

    constructor( address _donator , address _legatee, string memory name_,string memory symbol_) ERC721 (name_, symbol_) Ownable()
    {
        cptDonator++;
        donators[cptDonator] = _donator;
        legatee = _legatee;

    }
   
   modifier onlyDonator(){
       require(msg.sender == donators[cptDonator], "you're not current donator" );
       _;
   }

    function mint( string memory _tokenURI) external  onlyDonator returns (uint)  {

        require(_tokenIds.current() <= totalSupply, "limit 500 files excedeed, create another collection" );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        address donator = donators[cptDonator];

        _safeMint(donator, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit NFTMinted( newItemId, donator, _tokenURI,  block.timestamp );

        return newItemId;
    }


    function setLegatee(address _addr )external onlyDonator {
        legatee = _addr;
    }

    function getLegatee() external view onlyDonator returns (address) {
        return legatee;
    } 

    // safetransferForm


    function transferAllForLegatee( /*uint16[] calldata _ids*/ ) external onlyDonator{

         _transferAllForLegatee();
    }



    function _transferAllForLegatee( /*uint16[] calldata _ids*/ ) private {

        require(legatee != address(0), "you're not have legatee" );

        setApprovalForAll(legatee,true);
        address donator = donators[cptDonator];
        // _batchTransferFrom(donator,legatee,_ids);

        address newDonator = legatee;
        cptDonator++;
        donators[cptDonator]=legatee;
        legatee = address(0);

        emit TransferNewDonator(donator, newDonator, block.timestamp);

    }


    function batchTransferFrom(address _from,address _to,uint16[] calldata _ids) external onlyDonator{

        _batchTransferFrom( _from, _to,_ids);

        emit BatchTokenTransfered( _from, _to,_ids  ,block.timestamp);
    }

    function _batchTransferFrom(address _from,address _to,uint16[] calldata _ids) private {

        for(uint x = 0; x < _ids.length; x++) {
            //require(_isApprovedOrOwner(_msgSender(), _ids[x]), "ERC721: transfer caller is not owner nor approved");
            safeTransferFrom(_from,_to,_ids[x]);
        }
        emit BatchTokenTransfered( _from, _to, _ids, block.timestamp);
    }

   
}