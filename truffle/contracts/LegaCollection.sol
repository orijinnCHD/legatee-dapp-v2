// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract LegaCollection is ERC721URIStorage{


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    uint16 constant private  _totalSupply = 100;
    // uint256 private _cptDonator;
    uint256 private _time;
    
    address private _legatee;
    address private _security;
    address private _donator;

    mapping(address => bool ) _whitelisters;

    
    event whitelisterRegistered(address indexed whitelister, bool isRegistered, uint timeStamp );
    event whitelisterStatus(address indexed whitelister, bool _isWhitelisted, uint timeStamp );
    event LegateeRegistered(address indexed legatee,uint timeStamp);


    event DonatorRegistered( uint id, address indexed donatorRegistered, uint timeStamp );
    event TokenMinted(uint id, address indexed donator, string  tokenURI, uint timeStamp);
    event TransferNewDonator(address oldDonator, address _newDonator, uint _timeStamp);
    event BatchTokenTransfered( address indexed from, address indexed to, uint16[] tokenIds,  uint timeStamp);
    event PushDMS( bool isDeath,uint currentTime, uint endTime );

    constructor(address security, address donator,address legatee, string memory name_,string memory symbol_) ERC721 (name_, symbol_){
        
        _donator = donator;
        _whitelisters[donator] = true;
        _whitelisters[_security] = true;
        _security = security;
        _legatee = legatee;

        _aliveCountdown30Days();

        emit whitelisterRegistered(donator,true, block.timestamp);
        emit LegateeRegistered(legatee,block.timestamp);

       // whitelisters[_security] = true;
        //emit whitelisterRegistered(_security,true, block.timestamp);
    }

    // modifier -----------------------------------

    modifier onlyDonator(){
        require(_donator == msg.sender , "only currentDonator can access this function");
        _;
    }

    modifier onlyWhitelisters(address addr){
        require(_whitelisters[addr], "only whitelister can access this function");
        _;
    }

    //-----mint-------------------------

    function mint( string memory _tokenURI) external onlyDonator  returns (uint)  {

        require(_tokenIds.current() <= _totalSupply, "limit 100 files excedeed, create another collection" );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit TokenMinted( newItemId, msg.sender, _tokenURI,  block.timestamp );
        return newItemId;
    }


    // legatee -----------------------

    function setLegatee(address _addr )external onlyDonator {
        
        //_setLegatee(_addr);
        require( _addr != address(0), "you must set valid address for legatee");
        _legatee = _addr;
        emit LegateeRegistered(_addr, block.timestamp);
    }

    function getLegatee() external view onlyDonator returns (address) {
        return _legatee;
    }

    // donator ---------------------------------------

    function getDonator()external view onlyWhitelisters(msg.sender) returns(address){

        return _donator;
    }

    // whitelisters -------------------------------

    function getWhitelisters(address addr) external view onlyWhitelisters(addr) returns(bool){

        return _whitelisters[addr];
    }

    function _revokeDonatorWhitelister() private {

        require( _whitelisters[_donator] ,"whitelister is already revoked");
        _whitelisters[_donator] = false;

        emit whitelisterStatus( _donator, _whitelisters[_donator], block.timestamp );
    }

    //-- transfertFrom ---------------------------


    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyDonator {
        
        super.transferFrom(from,to,tokenId);
    }


    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyDonator {

        super.safeTransferFrom(from, to, tokenId);
    }


    // batchTransferFrom -------------------------------------------

    // function batchTransferFrom(address from,address to,uint16[] calldata ids) external onlyWhitelisters(msg.sender){

    //     _batchTransferFrom( from, to,ids);
        
    // }

    // function _batchTransferFrom(address from,address to,uint16[] calldata ids) private {

    //     for(uint x = 0; x < ids.length; x++) 
    //     {
    //         safeTransferFrom(from,to,ids[x]);
    //     }

    //     emit BatchTokenTransfered( from, to, ids, block.timestamp);
    // }



    
    // ApprovalAllForLegatee

    function ApprovalAllForLegateeBySecurity()external {

        require(_security == msg.sender , "exclusive function for security address");

        _ApprovalAllForLegatee();
    }

    function ApprovalAllForLegateeByDonator() external onlyDonator{

        _ApprovalAllForLegatee();
    } 


    function _ApprovalAllForLegatee() private {

        require(_legatee != address(0), "you're not have legatee address" );
        require(_checkIsDeath(), "donator is always alive");

        // transfer 

        setApprovalForAll(_legatee,true);
        _revokeDonatorWhitelister();

        _whitelisters[_legatee]=true;
        emit TransferNewDonator(_donator, _legatee, block.timestamp);
        _donator=_legatee;
    }

    //------------------death man switch ---------------------------------------//

    function _aliveCountdown30Days() private {
        _time = block.timestamp + 30 days;
    }


    function donatorSendAliveSignal() external onlyDonator returns(bool){
        return _checkIsDeath();

    }


    function _checkIsDeath() private returns(bool){

        bool _isDeath;

        if(!_isTimeExpired()){
            _aliveCountdown30Days();
            _isDeath = false;
        }
        else
            _isDeath =  true;

        emit PushDMS( _isDeath,block.timestamp, _time );
        return _isDeath;
    }

    function _isTimeExpired()private view returns(bool){

        if(block.timestamp > _time )
            return true;
        else
            return false;

    }

    function getTime()external view onlyDonator returns(uint){
        return _time;
    }


}