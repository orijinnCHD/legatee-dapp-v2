import Web3 from "web3";
import React, { useEffect, useState } from 'react';
import {setCollections} from '../../feature/pages.slice';
import {setLegaCollections,setLegaCollectionsArtifact} from '../../feature/collections.slice';
import { useDispatch, useSelector } from "react-redux";

import myLegaCollection from '../../contracts/LegaCollection.json';



const FormCollection = () => {

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [legataire,setLegataire]=useState();
    const [symbol,setSymbol]=useState("");
    const [message,setMessage]=useState("");
    const collections = useSelector((state)=> state.pages.collections);

    // web3
    const factoryContract = useSelector((state)=> state.providers.contract);
    const donator = useSelector((state)=> state.providers.account);
    const owner = useSelector((state)=> state.providers.owner);
    const web3 = useSelector((state)=> state.providers.web3);
    
    // instance Collection

    const legaCollection = useSelector((state)=> state.collections.legaCollections);
    //const legaArtifact = useSelector((state)=> state.collections.legaCollectionArtifact);


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
        await createLegaCollection(name,symbol,legataire);
    }

    // useEffect(()=>{

    //     // if(message !== "")
    //     //     setTimeout(() => {
    //     //         setMessage("");         
    //     // }, 3000);
        
    //     //     console.log(collection);
    //     console.log(collections);
    //     console.log(message);

    //     //console.log("abi" +legaArtifact.ABI );
        
    // },[message,collections,myLegaCollection])


    ///////implementation contract

    const createLegaCollection = async(name,symbol,legataire )=>{

        console.log("donator : " + donator);
        console.log("legatee : " + legataire);
        console.log("owner : " + owner);
        console.log(myLegaCollection.networks);
        console.log(web3);

        try{

            
            let address = await factoryContract.methods.createLegaCollection(donator,
            legataire,
            name,
            symbol )
            .call({from:donator});
            
            console.log("address : " + address);

            let instance =  new web3.eth.Contract(myLegaCollection.abi,address);
            console.log(instance);
            
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