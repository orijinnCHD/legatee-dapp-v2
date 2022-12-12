import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import { useDispatch, useSelector } from "react-redux";
import useEth from "../../contexts/EthContext/useEth";
import {setIsTokeniseHome} from '../../feature/pages.slice';

const MyTokenList = () => {

    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);
    const collections = useSelector((state)=> state.collections.legaCollections);
   // const [collectionArray,setCollectionArray]=useState([]);
    const [datas,setDatas]=useState([]);
    const [countDown,setCountDown]=useState("");
    const dispatch = useDispatch();
    const { state: { contract, accounts,web3 } } = useEth();

    useEffect(()=>{
        dispatch(setIsTokeniseHome(true));
    },[isTokeniseHome])


    const getEndDate=(timeStamp)=>{

        // var timeStamp= 1107110465663
        var dateFormat= new Date(timeStamp);

        return("Date: "+ dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds());
    }


    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

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

                let datas = [];
                
                const artifact = require("../../contracts/LegaCollection.json");

                for (const address of collectionAddress) {
                // On recup les données de la proposal
                    const instance = new web3.eth.Contract(artifact.abi,address);
                    const name = await instance.methods.name().call({from:accounts[0]});
                    const time = await instance.methods.getTime().call({from:accounts[0]});
                    console.log(time);
                    const evenToken = await instance.getPastEvents("TokenMinted", { fromBlock: 0, toBlock: "latest" });
                    console.log(evenToken);
                    //On fait un tableau avec leur ids
                    const URIS = evenToken.map((token) => (token.returnValues.tokenURI));
                    

                    let data =[];
                    for(const URI of URIS){

                        console.log(URI);
                        const hash = URI.slice(7);
                        console.log(hash);
                        
                        let url2 = `https://gateway.pinata.cloud/ipfs/${hash}`;
                        
                        const response = await fetch(url2);
                        
                        const metadata = await response.json();
                        console.log(metadata);

                        data.push(metadata);
                        // data.push(
                        //     {
                        //         collectionName:metadata.title,
                        //         metadata:
                        //     }
                        // )
                        
                    }
                    
                    datas.push(
                        {
                            collection:name,
                            time:timeConverter(time),
                            tokens:data,

                        }
                    )

                }
                setDatas(datas);

                

                //     for(const URI of URIData){

                //         console.log(URI);
                //         const hash = URI.slice(7);
                //         console.log(hash);
                        
                //         let url2 = `https://gateway.pinata.cloud/ipfs/${hash}`;
                        
                //         const response = await fetch(url2);
                //         console.log(response);
                //         const metadata = await response.json();
                //         console.log(metadata);

                //         meta.push(metadata);
                //     }

                //     setMetadata(meta);
 
            }
        };
      
        getCollections();

    },[accounts])
    
    return (
        <div>
            <Navbar/>
            <SubNavbar/>
            <ul className="tokenList">
                {
                    datas && datas.map((data,index)=>(
                        <li key={index+1}>

                            <h1>{data.collection + " " +data.time }</h1> 

                            {data.tokens.map((data,index)=>(
                                < div key={index}>
                                    <img src={data.image} alt="" />
                                    <h3>{data.title +" " + (index+1) }</h3>
                                    <h3>{data.name}</h3>
                                    <h3>{data.description}</h3>
                                </div >
                            ))}
                            
                            
                            
                        </li>
                       
                    ))
                }

            </ul>
        </div>
    );
};

export default MyTokenList;