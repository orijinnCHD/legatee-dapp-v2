const ERC721 = artifacts.require("CollectioNERC721");

module.exports = async function (callback) {
    const deployed = await ERC721.deployed();


    //   const currentValue = (await deployed.read()).toNumber();
    //   console.log(`Current SimpleStorage value: ${currentValue}`);

    //   const { tx } = await deployed.write(currentValue + 1);
    //   console.log(`Confirmed transaction ${tx}`);

    //   const updatedValue = (await deployed.read()).toNumber();
    //   console.log(`Updated SimpleStorage value: ${updatedValue}`);

  callback();
};