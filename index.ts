import { TezosToolkit } from '@taquito/taquito';

const axios = require('axios');
const tezos = new TezosToolkit('https://delphinet.smartpy.io');


async function GetData() {

    const response = await axios.get("https://api.coinbase.com/v2/prices/XTZ-USD/sell");

    const amount = response.data.data.amount * 100
    console.log(amount)

}

GetData();
