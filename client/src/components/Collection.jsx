import React from 'react';

const Collection = ({collection,index}) => {
    return (
        <li className="collection">
            <p>{index + 1}</p>
            <p>{collection.name}</p>
        </li>
    );
};

export default Collection;