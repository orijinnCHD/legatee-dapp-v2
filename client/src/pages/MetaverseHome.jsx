import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import {setIsTokeniseHome} from '../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";

const MetaverseHome = () => {

    const dispatch = useDispatch();
    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);

    useEffect(()=>{
        dispatch(setIsTokeniseHome(false));
    },[isTokeniseHome])

    return (
        <div className='metaverseHome'>
            <header>
                <Navbar/>
                <div className="main">
                    <h2>Legatree</h2>
                    <h1>metaverse & marketplace</h1>
                </div>
            </header>
        </div>
    );
};

export default MetaverseHome;