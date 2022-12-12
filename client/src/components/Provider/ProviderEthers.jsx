import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers';
import myContractFactory from '../../contracts/CollectionFactory.json';
import Web3 from "web3";

const ProviderEthers = () => {

   // deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	//let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
            console.log("a");
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
                console.log("b");
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
                console.log("c");
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {

		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

    useEffect(()=>{
        console.log(connButtonText);
        console.log(signer);
        console.log(contract);
        console.log(defaultAccount);
        // console.log(defaultAccount);
        console.log("d");

        
    },[])

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = async() => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

        console.log("e");

        const rpcURL = "http://localhost:8545";
        //console.log(rpcURL);
        const web3 = new Web3(rpcURL);
        //console.log(web3);
        const id = await web3.eth.net.getId();
        // console.log(id);
        // console.log(myContractFactory);
        const deployedNetwork = myContractFactory.networks[id];

        console.log("f" +defaultAccount );

		let tempContract = new ethers.Contract(deployedNetwork.address, myContractFactory.abi, tempSigner);
        console.log(tempContract);
		setContract(tempContract);	
        console.log("defau account_ : " +defaultAccount );
        const address = await contract.createLegaCollection(defaultAccount,'0x2cf8061B389eF3512580eF82381f7D22d9fa95AE',"gaga","m");
        //console.log(address);

        console.log("g");
	}



    return (
        <div>
            {
                connButtonText == "Wallet Connected"?
                <button>deconnect</button>
                :
                <button onClick={connectWalletHandler}>{connButtonText}</button>
            }
            
        </div>
    );
};

export default ProviderEthers;