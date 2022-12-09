const Factory = artifacts.require("CollectionFactory");
const LegaCollection = artifacts.require("LegaCollection");
// console.log(LegaCollection);
const{BN,expectRevert,expectEvent} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = require('@openzeppelin/test-helpers/src/constants');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const{expect} = require('chai');

contract("CollectionFactory",accounts=>{

    const _owner=accounts[0];
    const _donator=accounts[1];
    const _legatee=accounts[2];

    let factInstance;
    

    describe('---DEPLOYEMENT',function(){

        it('could DEPLOYED voting contract PROPRELY ',async()=>{
            
            factInstance = await Factory.new({from:_owner});
            assert(factInstance.address !== '');

        })
    })

    

    describe('----FUNCTIONS',function(){

        describe('--CREATE LEGACOLLECTION AND USE RESULT',function(){

            beforeEach(async()=>{
                factInstance = await Factory.new({from:_owner});
            })

            it("should CREATE legaCollection and RETURNS address Contract Collection",async()=>{

                const addrCollection = factInstance.createLegaCollection.call(_donator,_legatee,"lega#1","lgt",{from:_owner});
                assert(addrCollection !== '');

            })

            it("should CREATE legaCollection returns CONTRACTADDRESS and DEPLOYED this contract AND return NAME",async()=>{

                const addrCollection = await factInstance.createLegaCollection.call(_donator,_legatee,"lega#1","lgt",{from:_donator});
                //console.log(addrCollection);

                const deployer = await LegaCollection.deployed({from:addrCollection});
                //console.log(deployer)
                const name = await deployer.name({from:_donator});
                console.log(name)
                // const legaCollection = new web3.eth.Contract(LegaCollection.abi,addrCollection);
                // //console.log(await legaCollection.methods.owner().call());
                // console.log(legaCollection);
                // //await LegaCollection.methods.setLegatee(_legatee).send({from:_donator});
                // const name = await LegaCollection.methods.name().call({from:_donator});
                // console.log(name);
                


            })

            
        })

        



        

    })






    describe('----EVENTS',function(){


    })

})