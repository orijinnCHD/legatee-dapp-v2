import React from 'react';
import Navbar from '../../components/Navbar';
import SubNavbar from '../../components/subNavbar';
import FormCreateCollectionMP from './FormCreateCollectionMP';



const CreateCollectionMP = () => {
    return (
        <div>
            <Navbar/>
            <SubNavbar/>
           <FormCreateCollectionMP/> 
        </div>
    );
};

export default CreateCollectionMP;