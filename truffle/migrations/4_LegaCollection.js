const LegaCollection = artifacts.require("LegaCollection");

module.exports = function (deployer) {
  deployer.deploy(LegaCollection,
    "0x76188131fF62e1A28f0e2bbb3dBb1118DD3A2C46",
    "0xb5dD57d61cAC67179C397e87368641419ce97b04",
    "0x876c280cf74403d5AE6741E6cAcBae2F02866cae",
    "NAME",
    "symbol");
};