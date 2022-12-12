const Factory = artifacts.require("CollectionFactory");
const LegaCollection = artifacts.require("LegaCollection");
// console.log(LegaCollection);
const{BN,expectRevert,expectEvent} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = require('@openzeppelin/test-helpers/src/constants');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const{expect} = require('chai');