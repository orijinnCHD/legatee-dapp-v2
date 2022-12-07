import React from 'react';
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import FormMintNFT from './FormMintNFT';

const CreateNFT = () => {
    return (
        <div>
            <Navbar/>
            <SubNavbar/>
           <FormMintNFT/> 
        </div>
    );
};

export default CreateNFT;