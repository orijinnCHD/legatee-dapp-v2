import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";



const SelectedHome = () => {

    return (
        <div className="selected-home">

            <div className="left-part">
                <h2>legatree </h2>
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, placeat.
                </h1>
                <h3>Equipe : person_1 , person_2, person_3 </h3>
                <h4>MVP V1</h4>
            </div>
            <ul className="right-part">

                <NavLink to="/TokeniseHome"><button >tokenise your file</button></NavLink>
                <NavLink to="/MetaverseHome"><button >remember people</button></NavLink>
                
            </ul>
        </div>

    );
};

export default SelectedHome;