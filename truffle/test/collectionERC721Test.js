const ERC721 = artifacts.require("CollectionERC721");
const{BN,expectRevert,expectEvent} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = require('@openzeppelin/test-helpers/src/constants');
const{expect} = require('chai');

contract("CollectionERC721",accounts=>{

    const _owner=accounts[0];
    const person1=accounts[1];
    const peroson2=accounts[2];
    

    describe('---DEPLOYEMENT',function(){

        it('could DEPLOYED voting contract PROPRELY ',async()=>{
            
            const instance = await ERC721.new({from:_owner});
            assert(instance.address !== '');

        })
    })

})