const Factory = artifacts.require("CollectionFactory");
const{BN,expectRevert,expectEvent} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = require('@openzeppelin/test-helpers/src/constants');
const{expect} = require('chai');

contract("CollectionFactory",accounts=>{

    const _owner=accounts[0];
    const person1=accounts[1];
    const peroson2=accounts[2];
    

    describe('---DEPLOYEMENT',function(){

        it('could DEPLOYED voting contract PROPRELY ',async()=>{
            
            const instance = await Factory.new({from:_owner});
            assert(instance.address !== '');

        })
    })

})