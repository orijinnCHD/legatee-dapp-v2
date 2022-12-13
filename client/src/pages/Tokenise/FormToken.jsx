import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {setTokens} from '../../feature/pages.slice';
import { useDispatch } from "react-redux";
import useEth from "../../contexts/EthContext/useEth";


const FormToken = ({collectionForm}) => {

    //const [tokens,setTokens] =useState([]);
    const [name,setName]=useState("");
    const [files,setFiles]=useState([]);
    const [filesPinata,setFilesPinata]=useState(null);
    const [description,setDescription]=useState("");
    const [message,setMessage]=useState("");

    const { state: { contract, accounts } } = useEth();


    const dispatch = useDispatch();

    const submit =async (e)=>{
        e.preventDefault();
        if(name=== "" || description === "" || filesPinata === null || files === "" ){
            setMessage('you must check ALL inputs');
            return;
        }
        
        const token ={name:name,description:description};
        dispatch(setTokens(token));
        setMessage('valider');

        sendFileToIPFS(e);

    }


    const sendImgToIPFS = async (e) => {

        e.preventDefault();

        if (filesPinata) {
            try {

                const formData = new FormData();
                formData.append("file", filesPinata);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key':`${process.env.REACT_APP_PINATA_KEY}`,
                        'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                // console.log(response.data.IpfsHash);
                //sendJSONtoIPFS(ImgHash)
                return ImgHash;


            } catch (error) {
                console.log("File to IPFS: ")
                console.log(error)
            }
        }
        else{
            console.log("not fileupload");
        }
    }


    const sendJSONtoIPFS =async(imgHash)=>{

        try {

            const nameCollection = await getNameCollection();

            var data = JSON.stringify({
                "pinataOptions": {
                  "cidVersion": 1
                },
                "pinataMetadata": {
                  "name": nameCollection,
                },
                "pinataContent":{
                    "title":nameCollection,
                    "name":name,
                    "description":description,
                    "image":imgHash,
                    "attribute":
                    [
                        // {
                        //     "trait_type":"taille",
                        //     "value":"185"
                        // },
                        // {
                        //     "trait_type":"cheveux",
                        //     "value":"court"
                        // }
                    ]
                }
               
            });

            
            const resJSON = await axios({
                method:"post",
                url:"https://api.pinata.cloud/pinning/pinJsonToIPFS",
                data:data,
                headers:{
                    'pinata_api_key':`${process.env.REACT_APP_PINATA_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_SECRET}`,
                    'Content-Type': 'application/json'
                    
                },
            });
            const tokenURI =`ipfs://${resJSON.data.IpfsHash}`;
            return tokenURI;
        } catch (error) {
            
        }
    }



    const mintNFT = async(tokenURI)=>{

        // const artifact = require("../../contracts/LegaCollection.json");
        const instance = collectionForm.collectionContract;
        await instance.methods.mint( tokenURI ).send({from:accounts[0]})
        // .then(async function(receipt){
           
        // });
        
        
    }

    const getNameCollection= async()=>{
        const instance = collectionForm.collectionContract;
        const name = await instance.methods.name().call({from:accounts[0]});
        
        return name;
    }


    useEffect(()=>{
        console.log(collectionForm.collectionContract);
        console.log(getNameCollection());
    },[])





    const sendFileToIPFS =async(e)=>{

        const imgHash = await sendImgToIPFS(e);
        console.log(imgHash);
        const tokenURI = await sendJSONtoIPFS(imgHash);
        console.log(tokenURI);
        
        mintNFT(tokenURI);
    }



    return (
        <form action="" className='formToken'>
                <h3>create Token</h3>
                <input type="file" name="file" id="file" placeholder='search file' onChange={e=>setFilesPinata(e.target.files[0])}  />
                <input type="text" name="name" id="name" placeholder='name' onChange={e=>setName(e.target.value)} />
                <input type="text" name="description" id="description" placeholder='description' onChange={e=>setDescription(e.target.value)} />
                <input type="submit" value="submit" onClick={e=>submit(e)}  />
                <p>{message}</p>
            </form>
    );
};

export default FormToken;