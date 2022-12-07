import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";



const SelectedHome = () => {

    return (
        <div className="selected-home">

            <div className="left-part">
                <h4>legatree</h4>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Perferendis placeat quas vitae quasi alias ex, 
                    repudiandae veniam quos consequuntur labore!
                </h1>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, pariatur?</h3>
            </div>
            <ul className="right-part">

                <NavLink to="/TokeniseHome"><button >tokenise your file</button></NavLink>
                <NavLink to="/MetaverseHome"><button >remember people</button></NavLink>
                
            </ul>
        </div>

    );
};

export default SelectedHome;