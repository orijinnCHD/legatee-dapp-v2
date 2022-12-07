import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import FormCollection from './FormCollection';
import {setIsTokeniseHome} from '../../feature/pages.slice';
import { useDispatch, useSelector } from "react-redux";

const CreateCollection = () => {

    const dispatch = useDispatch();
    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);
    

    useEffect(()=>{
        dispatch(setIsTokeniseHome(true));
    },[isTokeniseHome])
    
    return (

        <div>
            <Navbar/>
            <SubNavbar/>
            <FormCollection/>
            
        </div>
    );
};

export default CreateCollection;

