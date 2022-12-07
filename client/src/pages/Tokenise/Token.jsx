import React from 'react';

const Token = ({token,index}) => {
    return (
        <li className="token">
            <img src="" alt="" />
            {/* <h4>Token # {index+1}</h4>
            <h4>name #</h4>
            <h5>{token.name}</h5>
            <h4>description</h4> */}
            <p>{token.description}</p>

        </li>
    );
};

export default Token;