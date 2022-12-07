import React, {useEffect} from 'react';
import {useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
const Navbar = () => {

    const isTokeniseHome = useSelector((state)=> state.pages.isTokeniseHome);

    const tokeniseNav = 
    <div className="nav-tokenise-block">
        <ul className="nav-list" >
            <NavLink to="/CreateCollection"><li>tokenise</li></NavLink>
            <NavLink to="/myTokenList"><li>settings</li></NavLink>
            <NavLink to="/metaverseHome"><li> metaverse home</li></NavLink>
        </ul>
    </div>

   

    const metaverseNav = 
        <div className="nav-meta-block">
            <ul className="nav-list" >
                <NavLink to="/marketplace"><li>marketplace</li></NavLink>
                <NavLink to="/metaverse"><li>metaverse</li></NavLink>
                <NavLink to="/tokeniseHome"><li> tokenise home</li></NavLink>
            </ul>
        </div>

    return (
        <div className="navbar">
            <h3 id="logo">legatree</h3>
            {
                isTokeniseHome?
                tokeniseNav
                :
                metaverseNav
            }
            <button>connection</button>
        </div>
        
    );
};

export default Navbar;