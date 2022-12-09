import Web3 from "web3";
import React, { useEffect, useState } from 'react';
import myContractFactory from '../../contracts/CollectionFactory.json';
import myLegaCollection from '../../contracts/LegaCollection.json';
//import myContractCollection from '../../contracts/LegaCollectionERC721.json';
import { useDispatch, useSelector } from "react-redux";
import {setAccount, setContract, setOwner, setChain} from '../../feature/providers.slice';
import {setLegaCollectionsArtifact} from '../../feature/collections.slice';


const ProviderWeb3 = (props) => {

    const account = useSelector((state)=> state.providers.account);
    const connected = useSelector((state)=> state.providers.connected);    
    const web3 = useSelector((state)=> state.providers.web3);
    //const provider = useSelector((state)=> state.providers.provider);

    const [provider,setProvider] = useState(window.ethereum);
    
    const dispatch = useDispatch();


    useEffect(()=>{

        const handleAccountsChanged = async(accounts)=>{
            createContract();
            const web3Accounts = await web3.eth.getAccounts();
            console.log(web3Accounts);
            if(accounts.length === 0){
                props.onLogout();
               // await web3.clearCachedProvider();
            }else if(accounts[0] !== account){
                dispatch(setAccount(accounts[0]));
                console.log("owner : " + accounts[0] + " account : " + account);
            }
        }
        const handleChainChanged = async(chainId)=>{
            console.log(chainId);
            createContract();
            const web3ChainId = await web3.eth.getChainId();
            dispatch(setChain(web3ChainId));
        }

        if(connected){
            provider.on("accountsChanged",handleAccountsChanged);
            provider.on("chainChanged",handleChainChanged);
        }
       

        return()=>{
            if(connected){
                provider.removeListener("accountsChanged",handleAccountsChanged);
                provider.removeListener("chainChanged",handleChainChanged);
            }
        }
            
    },[connected]);


    //-----------------------contract----------------------------///

    const createContract = async() =>{
        //const rpcURL = new Web3(Web3.givenProvider || "http://localhost:8545");
        const rpcURL = "http://localhost:8545";
        //console.log(rpcURL);
        const web3 = new Web3(rpcURL);
        //console.log(web3);
        const id = await web3.eth.net.getId();
        // console.log(id);
        // console.log(myContractFactory);
        const deployedNetwork = myContractFactory.networks[id];
        console.log("deployedNetwork.address : " + deployedNetwork.address);
        const contract =  new web3.eth.Contract(myContractFactory.abi,deployedNetwork.address);

        const owner = await contract.methods.owner().call();
        console.log("owner " + owner);
        dispatch(setOwner(owner));
        dispatch(setContract(contract));
        console.log(myLegaCollection);
        dispatch(setLegaCollectionsArtifact(myLegaCollection));

    }


    useEffect(() => {
        const tryInit = async () => {
          try {
            createContract();
            //console.log("connect contract");
          } catch (err) {
            console.error(err);
          }
        };
    
        tryInit();
    }, [createContract]);


      

    return (
        <div>
           
        </div>
    );
};

export default ProviderWeb3;
