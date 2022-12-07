const Marketplace = artifacts.require("MarketplaceNFT");
const NFT = artifacts.require("CollectionERC721");
const{BN,expectRevert,expectEvent} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = require('@openzeppelin/test-helpers/src/constants');
const{expect} = require('chai');

/*

const weiValue = Web3.utils.toWei('1', 'ether');
console.log(weiValue);
// => 1000000000000000000

const etherValue = Web3.utils.fromWei('1000000000000000000', 'ether');
console.log(etherValue);
// => 1


*/


contract("MarketplaceNFT",accounts=>{

    const _owner=accounts[0];
    const person1=accounts[1];
    const mkpAccount=accounts[2];
    const buyer=accounts[3];
    const URI ="address uri";
    const feePercent = 1; 
    const price = 2;
    const fee = (feePercent/100)*price;
    const totalPriceInWei = 0;

    let nftInstance;
    let mkpInstance;

    describe.skip('---DEPLOYEMENT',function(){

        it('could DEPLOYED MARKETPLACE contract PROPRELY ',async()=>{
            
            mkpInstance = await Marketplace.new(feePercent,{from:_owner});
            assert(mkpInstance.address !== '');

        })

        it('could DEPLOYED NFT contract PROPRELY ',async()=>{
            
            nftInstance = await NFT.new("legatee","tgt",{from:_owner});
            assert(nftInstance.address !== '');

        })
    })


    describe.skip('---MINTING NFTS',function(){

        beforeEach(async()=>{
            nftInstance = await NFT.new("legatee","tgt",{from:_owner});
        })

        it('should track each minted NFT',async()=>{
            
            await nftInstance.mint(URI,{from:person1});

            expect(await nftInstance.getCount({from:person1})).to.be.bignumber.equal(new BN(1));
            expect(await nftInstance.balanceOf(person1,{from:person1})).to.be.bignumber.equal(new BN(1));
            expect(await nftInstance.tokenURI(1,{from:person1})).to.be.equal(URI);

            await nftInstance.mint(URI,{from:_owner});

            expect(await nftInstance.getCount({from:_owner})).to.be.bignumber.equal(new BN(2));
            expect(await nftInstance.balanceOf(_owner,{from:_owner})).to.be.bignumber.equal(new BN(1));
            expect(await nftInstance.tokenURI(2,{from:_owner})).to.be.equal(URI);

        })

    })

    describe.skip("---CREATE MARKETPLACE ITEMS---",function(){

        beforeEach(async()=>{
            
            nftInstance = await NFT.new("legatee","tgt",{from:_owner});
            await nftInstance.mint(URI,{from:person1});
            mkpInstance = await Marketplace.new(feePercent,{from:mkpAccount});
            // owner 
            const owned = await nftInstance.ownerOf(1,{from:person1});
            console.log(owned);
            console.log(person1);
            await nftInstance.setApprovalForAll(mkpInstance.address, true,{from:person1});
        })

        it("should track newly created Item  transfer NFT from seller to marketplace and emit Offered event",async()=>{


            // person1 offers their nft at a price of 2 ether or wei ?
            const receipt =  await mkpInstance.createItem(nftInstance.address, 1 ,price,{from:person1});
            expectEvent(receipt,'Offered',{
                
                nft:nftInstance.address,
                itemId:new BN(1),
                tokenId:new BN(1),
                price:BN(price),
                seller:person1

            })


            // verify le name on instance nft is legatee
            const name = await nftInstance.name({from:_owner});
            expect(name).to.be.equal("legatee");
            
            // verify owner nft is marketplace  after approveall and createItem
            const ownerNFT = await nftInstance.ownerOf(1,{from:person1});
            console.log(ownerNFT);
            console.log(mkpInstance.address);
            expect(ownerNFT).to.equal(mkpInstance.address);


            //verify items mapping and check information
            const item = await mkpInstance.items.call(1,{from:person1});
            expect(item[0]).to.be.equal(nftInstance.address);
            expect(item[1]).to.be.bignumber.equal(new BN(1));
            expect(item[2]).to.be.bignumber.equal(new BN(1));
            expect(item[3]).to.be.bignumber.equal(new BN(2));
            
            expect(item[5]).to.be.false;

        })




    })

    describe("---PURCHASING MARKETPLACE ITEMS-----",function(){

        const itemId = 1;

        beforeEach(async function(){

            nftInstance = await NFT.new("legatee","tgt",{from:_owner});
            await nftInstance.mint(URI,{from:person1});
            mkpInstance = await Marketplace.new(feePercent,{from:mkpAccount});
            console.log("feePercent : " + feePercent);
            // web3.utils.toWei("100", "ether)
            //web3.utils.toWei("1", "wei")
            // accept marketplace to spend tokens
            await nftInstance.setApprovalForAll(mkpInstance.address,true,{from:person1});
            await mkpInstance.createItem(nftInstance.address,itemId,price,{from:person1})
            
            
        
        })

        it("should update interm as sold, pay seller, transfer NFT to BUYER, charge fees and emit a bought event",async()=>{
            const sellerInitialETHBalance = await web3.eth.getBalance(person1);
            const buyerIntialETHBalance = await web3.eth.getBalance(buyer);

            console.log("sellerInitialETHBalance :" +sellerInitialETHBalance );
            console.log("buyerIntialETHBalance :" +buyerIntialETHBalance );
            
            const feeAccountIntialETHBalance = await web3.eth.getBalance(mkpAccount);

            // fetch items total price (market fees + item price)
           const totalPriceInWei = await mkpInstance.getTotalPriceItem(itemId,{from:mkpAccount});
           // valute : price accept sell a buyer

           // purchase item by buyer
           const receipt = await mkpInstance.purchaseItem(itemId,{from:buyer,value: totalPriceInWei});
           
            // get the item for buyer
           const item = await mkpInstance.items.call(itemId,{from:mkpAccount});
           console.log(item[0]);
           expectEvent(receipt,'Bought',{
                
                nft:item[0],
                seller:new BN(item[4]),
                buyer:buyer,
                itemId:new BN(itemId),
                tokenId:new BN(item[2]),
                price:new BN(item[3])

            })


            const sellerFinalETHBalance = await web3.eth.getBalance(person1);
            const buyerFinalETHBalance = await web3.eth.getBalance(buyer);

            // Item should be marked as sold
            expect(item[5]).to.be.true;


            //EXEMPLE ADD WEI IN WEB3
            // const priceInWei = web3.utils.toWei(new BN(price),"wei");
            // const amountToAdd = new BN(sellerInitialETHBalance);
            // const newAmountInWei = priceInWei.add(amountToAdd);
            // console.log(newAmountInWei.toString());

            // console.log(Web3.utils.toWei(new BN(price),"wei").add(new BN(sellerInitialETHBalance)).toString())
            
            // verify balance finale seller = price  + balance initial seller
            expect(new BN(sellerFinalETHBalance)).to.be.bignumber.equal(web3.utils.toWei(new BN(price),"wei").add(new BN(sellerInitialETHBalance)));

            console.log(buyerFinalETHBalance.toString());
            console.log(web3.utils.toWei(new BN(buyerFinalETHBalance),"wei").sub(new BN(buyerIntialETHBalance)).toString());
            console.log(buyerIntialETHBalance.toString());
            //expect(new BN(buyerFinalETHBalance)).to.be.bignumber.equal(web3.utils.toWei(new BN(fee),"wei").add(new BN(buyerIntialETHBalance)));
        })
    })
})

//async function balance.current(account, unit = 'wei')

// const receipt =await votingInstance.endVotingSession({from:_owner});
//                 expectEvent(receipt,'WorkflowStatusChange',{
//                     previousStatus :new BN(3),
//                     newStatus:new BN(4)
//                 });