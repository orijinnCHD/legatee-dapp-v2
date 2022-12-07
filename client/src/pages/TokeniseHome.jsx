import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import {setIsTokeniseHome} from '../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";

const TokeniseHome = () => {

    const dispatch = useDispatch();
    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);
    

    useEffect(()=>{
        dispatch(setIsTokeniseHome(true));
    },[isTokeniseHome])

    return (
        <div className="tokeniseHome">
            <header>
                <Navbar/>
                <div className="main">
                    <h2>Legatree</h2>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, beatae.</h1>
                </div>
            </header>
        </div>
    );
};

export default TokeniseHome;