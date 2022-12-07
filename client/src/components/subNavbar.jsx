import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector } from "react-redux";


const SubNavbar = () => {

    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);


    const subNavBarTokenize =
        <ul className="subNavbar-list">
                <NavLink to="/createCollection"><li>create collection</li></NavLink>
                <NavLink to="/createToken"><li>create token</li></NavLink>
                <NavLink to="/myTokenList"><li>my token collection</li></NavLink>
        </ul>


    const subNavBarMetaverse =
        <ul className="subNavbar-list">
                <NavLink to="/marketplace"><li>home</li></NavLink>
                <NavLink to="/createCollectionMP"><li>create collection</li></NavLink>
                <NavLink to="/createNFT"><li>mint NFT</li></NavLink>
                <NavLink to="/myNFTList"><li>my collection</li></NavLink>
        </ul>
    

    return (
        <div className="subNavbar">
            {
                isTokeniseHome?
                subNavBarTokenize
                :
                subNavBarMetaverse
            }
            <span></span>
        </div>
        

    );
};

export default SubNavbar;