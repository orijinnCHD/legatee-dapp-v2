import React, { useEffect, useState } from 'react';
import {setCollections} from '../../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";


const FormCollection = () => {

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [legataire,setLegataire]=useState("");
    const [message,setMessage]=useState("");
    const collections = useSelector((state)=> state.pages.collections);
    const dispatch = useDispatch();


    function createSymbolAuto(str) {
        const firstLetters = str
          .split(' ')
          .map(word => word[0])
          .join('');
      
        return firstLetters;
    }

    const submit=(e)=>{
        e.preventDefault();
        if(name=== "" || description === "" || legataire == "" ){
            setMessage('you must write name AND description AND legataire');
            return;
        }
        
        const collection ={name:name,description:description,legataire:legataire};
        dispatch(setCollections(collection));
        setMessage('valider');
    }

    useEffect(()=>{

        if(message !== "")
            setTimeout(() => {
                setMessage("");         
        }, 3000);
        
        //     console.log(collection);
        console.log(collections);
        
    },[message,collections])

    return (
        <form action="" className="formCollection">
            <h3>créer une collection</h3>
            <input type="text" id="name" name="name" placeholder="le nom de la collection (ex: souvenir de france)" onChange={(e)=>{setName(e.target.value)}}></input>
            <h5>symbole : <span>{createSymbolAuto(name)}</span></h5>
            <input type="text" id="description" name="description" placeholder="description de votre collection" onChange={(e)=>{setDescription(e.target.value)}}></input>
            <input type="text" id="legataire" name="legataire" placeholder="address legataire" onChange={(e)=>{setLegataire(e.target.value)}}></input>

            <input type="submit" value="submit" onClick={ (e)=>submit(e)} />
            <p>{message}</p>

        </form>
    );
};

export default FormCollection;