import React from 'react';

const FormMintNFT = () => {
    return (
        <form action="" className="formMintNFT">
            <h2>Mint NFT</h2>
            <input type="file" name="file" id="file" />
            <input type="text" name="name" id="name" placeholder='name' />
            <input type="text" name="description" id="description" placeholder ='description'/>
            <input type="number" name="price" id="price"  placeholder='price ether'/>
            <input type="submit" value="submit" />
        </form>
    );
};

export default FormMintNFT;