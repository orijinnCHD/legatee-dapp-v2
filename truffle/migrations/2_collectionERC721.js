const ERC721 = artifacts.require("CollectionERC721");

module.exports = function (deployer) {
  deployer.deploy(ERC721,"","");
};
