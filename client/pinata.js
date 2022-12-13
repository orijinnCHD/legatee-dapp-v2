require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
// const key = process.env.PINATA_KEY;
// const secret = process.env.PINATA_SECRET;

export const  pinata = new pinataSDK(key, secret);
console.log(pinata);
