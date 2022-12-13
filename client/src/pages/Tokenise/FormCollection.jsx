import Web3 from "web3";
import React, { useEffect, useState } from 'react';
import {setCollections} from '../../feature/pages.slice';
import {setLegaCollection,setLegaCollectionsArtifact} from '../../feature/collections.slice';
import { useDispatch, useSelector } from "react-redux";
import useEth from "../../contexts/EthContext/useEth";


// import myLegaCollection from '../../contracts/LegaCollection.json';



const FormCollection = () => {

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [legataire,setLegataire]=useState();
    const [symbol,setSymbol]=useState("");
    const [message,setMessage]=useState("");
    const collections = useSelector((state)=> state.pages.collections);

    // web3
    const donator = useSelector((state)=> state.providers.account);
    const owner = useSelector((state)=> state.providers.owner);

    const { state: { contract, accounts,web3 } } = useEth();
    
    // instance Collection

    //const legaCollection = useSelector((state)=> state.collections.legaCollections);
    //let legaArtifact = useSelector((state)=> state.collections.legaCollectionArtifact);

    const [collection ,setCollection] =useState([]);

    const dispatch = useDispatch();


    function createSymbolAuto(str) {
        const firstLetters = str
          .split(' ')
          .map(word => word[0])
          .join('');
        
        //setSymbol(firstLetters);
        return firstLetters;
    }

    const submit=async(e)=>{

        e.preventDefault();
        if(name=== "" || description === "" || legataire == "" ){
            setMessage('you must write name AND description AND legataire');
            return;
        }
        
        //const collection ={name:name,description:description,legataire:legataire};
        //dispatch(setCollections(collection));
        const s = createSymbolAuto(name);
        setSymbol(s);
        setMessage('valider');
        createLegaCollection(name,symbol,legataire);
    }

    ///////implementation contract

    const createLegaCollection = async(name,symbol,legataire )=>{

        console.log("donator : " + donator);

        try{
            
           
            // let address = await factoryContract.methods.createTokenCollection(
            // legataire,
            // name,
            // symbol)
            // .send({from:donator});
            await contract.methods.createTokenCollection(legataire,
                name,
                symbol).send({ from: accounts[0]})
                .then(async function(receipt){

                    let address = await receipt.events.CollectionCreated.returnValues._collectionAddress;
                    console.log(address);
                    console.log(web3);

                    const artifact = require("../../contracts/LegaCollection.json");

                    const collection = new web3.eth.Contract(artifact.abi,address);
                    setCollection(collection);// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                    dispatch(setLegaCollection(collection));
                    // const legatee = await collection.methods.getLegatee().call({from:accounts[0]});
                    // console.log(legatee);
                
                });

                

            
            // console.log(collection);
            // const legatee = await collection.methods.name().call({from:accounts[0]});

            //let contract = new web3.eth.Contract(JSON.parse(legaArtifact.abi),address);
            // console.log(contract);
                
            
            
        }catch(err){
             console.log(err);
        }
                                                        
    }



    return (
        <form action="" className="formCollection">
            <h3>créer une collection</h3>
            <input type="text" id="name" name="name" placeholder="le nom de la collection (ex: souvenir de france)" onChange={(e)=>{setName(e.target.value)}}></input>
            <h5>symbole : <span>{createSymbolAuto(name)}</span></h5>
            <input type="text" id="description" name="description" placeholder="description de votre collection" onChange={(e)=>{setDescription(e.target.value)}}></input>
            <input type="text" id="legataire" name="legataire" placeholder="address legataire" onChange={(e)=>{setLegataire(e.target.value)}}></input>

            <input type="submit" value="submit" onClick={ async(e)=>submit(e)} />
            <p>{message}</p>

        </form>
    );
};

export default FormCollection;