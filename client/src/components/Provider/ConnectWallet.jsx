import React from 'react';
import Web3 from "web3";
import { useEffect, useState } from 'react';
import ProviderWeb3 from './ProviderWeb3';
import { useDispatch, useSelector } from "react-redux";
import {setAccount, setChain,setConnected,setWeb3 } from '../../feature/providers.slice';
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";



const ConnectWallet = () => {

    const { state: { contract, accounts } } = useEth();
    const { state } = useEth();

    // const account = useSelector((state)=> state.providers.account);
    // const chainId = useSelector((state)=> state.providers.chain);
    // const connected = useSelector((state)=> state.providers.connected);
    // const [isConnecting,setIsConnecting]=useState(false);
    // const [provider,setProvider] = useState(window.ethereum);

    // const dispatch = useDispatch();

    // //-----------------------LOGIN ---------------------------------//
    
    // const onLogin = async(provider)=>{
    //     const web3 = new Web3(provider);
        
    //     const accounts =await web3.eth.getAccounts();
    //     console.log(web3.eth);
    //     const chId =await web3.eth.getChainId();
    //     if(accounts.length === 0){
    //         console.log("Please connect to metamask");
    //     }else if(accounts[0] !== account){
           
    //         setProvider(provider);
           
    //         dispatch(setWeb3(web3));
    //         dispatch(setChain(chId));
    //         dispatch(setAccount(accounts[0]));
    //         console.log("account"+ account);
    //         dispatch(setConnected(true));
    //         console.log("connected" + connected);
    //     }
    //     else{
    //         console.log(account);
    //     }
    // }

    // const onLoginHandler =async()=>{
    //     const provider = detectProvider();
    //     if(provider){
    //         if(provider !== window.ethereum){
    //             console.error("Not Window ethereum provider : do you have multiple wallet");
    //         }
    //         setIsConnecting(true);
    //         await provider.request({
    //             method:"eth_requestAccounts",
    //         });
    //         setIsConnecting(false);
    //         onLogin(provider);
    //     }
    // }
    
    // //-------------------------logout-----------------------------

    // const onLogout = ()=>{

    //     dispatch(setConnected(false));
    //     dispatch(setAccount(null));
    //     dispatch(setChain(null));
    // }


    //----------------------------detect Provider----------------------

    // useEffect(()=>{
    //     setProvider(detectProvider());
        
    // },[connected])


    // const detectProvider = ()=>{
    //     let provider;
    //     if(window.ethereum){
    //         provider = window.ethereum;
    //     }else if(window.web3){
    //         provider = window.web3.currentProvider;
    //     }else{
    //         window.alert("no ethereum browser detecteed, install metamask");
    //     }
    //     return provider;
    // }


    const formatETHAddress = function(s, size = 4) {
        var first = s.slice(0, size + 1);
        var last = s.slice(-size);
        return first + "..." + last;
    }



    return (
        <div className='connectWallet'>
            {/* <ProviderWeb3 onLogout={onLogout}/>  */}
            {
                !state.artifact ? <NoticeNoArtifact /> :
                !state.contract ? <NoticeWrongNetwork /> :
                    accounts[0]?
                    <div className='disconnected'>
                        {/* <p>{formatETHAddress(account,4)}</p> */}
                        <button /*onClick={onLogout}*/>{formatETHAddress(accounts[0],4)}</button>
                    </div>
                    :
                    <div className="connected">
                        {/* <p>{"chainid  : " + chainId }</p>
                        <p>{"connected  : " + connected}</p> */}
                        <button /*onClick={onLoginHandler}*/>connect Wallet</button>
                        
                    </div>
            }
            
            
           
        </div>
    );
};

export default ConnectWallet;