import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import factTest from '../contracts/FactoryTest.json';
import legaTest from '../contracts/CollectionTest.json';

const Test = () => {

    const [account,setAccount] =useState(null);

    const createContract=async()=>{

      const rpcURL = "http://localhost:8545";
      //console.log(rpcURL);
      const web3 = new Web3(rpcURL);
      //console.log(web3);
      const id = await web3.eth.net.getId();
      // console.log(id);
      console.log(factTest);
      const deployedNetwork = factTest.networks[id];
      console.log(deployedNetwork);
      const contract =  new web3.eth.Contract(factTest.abi,deployedNetwork.address);
      console.log(contract);
      //const owner = await contract.methods.owner().call();
      let addr = await contract.methods.createCollection("name","symbol").call({from:account});
      console.log(addr);
      const contract2 =  new web3.eth.Contract(legaTest.abi,addr);
      console.log(account);
      let donator = await contract2.methods.setDonator(1).send({from:account});
      console.log(donator);

       
    }

    const connectWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("Please install MetaMask!");
            return;
          }
    
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          console.log("Connected", accounts[0]);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        connectWallet();
      }, []);

    return (
        <div>
            <button onClick={createContract}>test</button>
            <button onClick={connectWallet}>testconnect</button>
        </div>
    );
};

export default Test;