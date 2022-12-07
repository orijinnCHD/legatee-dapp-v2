const LegaCollection = artifacts.require("LegaCollection");

module.exports = function (deployer) {
  deployer.deploy(LegaCollection,"lega","l");
};
