const Marketplace = artifacts.require("MarketplaceNFT");

module.exports = function (deployer) {
  deployer.deploy(Marketplace,1);
};
