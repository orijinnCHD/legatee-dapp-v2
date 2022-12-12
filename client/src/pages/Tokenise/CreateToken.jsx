import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import {setIsTokeniseHome} from '../../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";
import FormToken from './FormToken';
import useEth from "../../contexts/EthContext/useEth";


const CreateToken = () => {

    const { state: { contract, accounts,web3 } } = useEth();

    const collections = useSelector((state)=> state.pages.collections);
    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);
    const legaCollection = useSelector((state)=> state.collections.legaCollections);

    const [selectCollection,setSelectCollection] =useState(0);
    const [collectionArray,setCollectionArray]=useState([]);
    const [collectionForm,setCollectionForm]=useState([]);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setIsTokeniseHome(true));
    },[isTokeniseHome])


    useEffect(()=>{

        async function getCollections() {

            console.log(contract);
            if (contract) {
                // On recup les proposals
                console.log('a');
                const eventCollection = await contract.getPastEvents("CollectionCreated", { fromBlock: 0, toBlock: "latest" });
                console.log(eventCollection);
                // On fait un tableau avec leur ids
                const collectionAddress = eventCollection
                .filter((collection)=>collection.returnValues._owner == accounts[0] && collection.returnValues._type == 0 )
                .map((collection) => (collection.returnValues._collectionAddress));
                
                console.log(collectionAddress);


                let collectionDatas = [];
                const artifact = require("../../contracts/LegaCollection.json");

                for (const address of collectionAddress) {
                    // On recup les données de la proposal
                    const instance = new web3.eth.Contract(artifact.abi,address);
                    const collectionObject = await contract.methods.getOneCollection(address).call({ from: accounts[0] });
                    console.log(collectionObject);
                    // On rempli le tableau

                    collectionDatas.push(
                        {   
                            collectionContract:instance,
                            name: collectionObject.name,
                            symbol: collectionObject.symbol,
                        }
                    );
                }

              setCollectionArray(collectionDatas);
 
            }
        };
      
        getCollections();

    },[accounts])
    
    return (
        <div>
            <Navbar/>
            <SubNavbar/>
            
            <ul className="selectCollection">
                {
                    collectionArray.map((collection,index)=>(
                        //<Collection key={index} collection={collection} index={index}/>
                        <li key={index+1} className="btn-list">
                            <button 
                                id={index+1}
                                className={selectCollection == index+1 ? "selectBtn-active":"collectBtn"}
                                onClick={e=>{
                                    setSelectCollection(e.currentTarget.id);
                                    setCollectionForm(collection);
                                }}> 
                                <h3>{index +1}</h3>
                                <h3>{collection.name}</h3>
                                <h3>{collection.symbol}</h3>
                            </button >
                            <div>
                                
                            </div>
                        </li>
                        
                    ))
                }
            </ul>   
            {
                selectCollection != 0 ?
                    <FormToken collectionForm={collectionForm}/>//create
                :
                    <h2> selectionner une collection </h2>

            }
            
        </div>

    );
};

export default CreateToken;