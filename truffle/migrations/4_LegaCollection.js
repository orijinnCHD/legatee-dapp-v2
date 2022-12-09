const LegaCollection = artifacts.require("LegaCollection");

module.exports = function (deployer) {
  deployer.deploy(LegaCollection,
    "0x0a157330b8814bdA1D0D262EcAaFbAab6e54F21b",
    "0xc971BB5085779cA9478C9754AFEbACEbfc725bA1",
    "metallica",
    "m");
};