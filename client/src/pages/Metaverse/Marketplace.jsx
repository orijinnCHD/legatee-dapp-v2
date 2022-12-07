import React, { useEffect } from 'react';
import {setIsTokeniseHome} from '../../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import NFT from '../../components/NFT';

const Marketplace = () => {

    
    const dispatch = useDispatch();
    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);
    const collectionsMP = useSelector((state)=> state.pages.collectionsMP);
    
    useEffect(()=>{
        dispatch(setIsTokeniseHome(false));
    },[isTokeniseHome])

    return (
        <div>
            <Navbar/>
            <SubNavbar/>
            <NFT/>
        </div>
    );
};

export default Marketplace;