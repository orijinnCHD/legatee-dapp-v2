import React, { useState } from 'react';

import {setTokens} from '../../feature/pages.slice';
import { useDispatch } from "react-redux";


const FormToken = () => {

    //const [tokens,setTokens] =useState([]);
    const [name,setName]=useState("");
    const [files,setFiles]=useState([]);
    const [filesPinata,setFilesPinata]=useState(null);
    const [description,setDescription]=useState("");
    const [message,setMessage]=useState("");



    const dispatch = useDispatch();

    const submit =(e)=>{
        e.preventDefault();
        if(name=== "" || description === "" || filesPinata === null || files === "" ){
            setMessage('you must check ALL inputs');
            return;
        }
        
        const token ={name:name,description:description};
        dispatch(setTokens(token));
        setMessage('valider');

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