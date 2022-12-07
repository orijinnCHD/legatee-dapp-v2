import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import {setIsTokeniseHome} from '../../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";
import FormToken from './FormToken';

const CreateToken = () => {

    const collections = useSelector((state)=> state.pages.collections);
    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);
    const [selectCollection,setSelectCollection] =useState(0);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setIsTokeniseHome(true));
    },[isTokeniseHome])

    return (
        <div>
            <Navbar/>
            <SubNavbar/>
            
            <ul className="selectCollection">
                {
                    collections.map((collection,index)=>(
                        //<Collection key={index} collection={collection} index={index}/>
                        <li key={index+1} className="btn-list">
                            <button 
                                id={index+1}
                                className={selectCollection == index+1 ? "selectBtn-active":"collectBtn"}
                                onClick={e=>setSelectCollection(e.currentTarget.id)}> 
                                <h3>{index +1}</h3>
                                <h3>{collection.name}</h3>
                            </button >
                        </li>
                    ))
                }
            </ul>   
            {
                selectCollection != 0 ?
                <FormToken/>//create
                :
                <h2> pas de collection </h2>

            }
            
        </div>

    );
};

export default CreateToken;