import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const axios = require('axios');

const tezos = new TezosToolkit('https://delphinet.smartpy.io');

tezos.setProvider({ signer: new InMemorySigner('edskRf6hntyzJaC4Kv4ywGgPRVV2M12ubX5GkN8NxrmpXzuqBRmeppq3WhUtepahhnRRAeMQ1H44psNLmAC2M58R1A8WG5A4eD') });



tezos.tz
  .getBalance('tz1ZS1rEYHPihHLzB3AEfgDkePqfzr1bk9ya')
  .then((balance) => console.log(`${balance.toNumber() / 1000000} ꜩ`))
  .catch((error) => console.log(JSON.stringify(error)));

async function GetData() {

    const response = await axios.get("https://api.coinbase.com/v2/prices/XTZ-USD/sell");

    const amount = Math.floor(response.data.data.amount * 100)
    console.log(amount)

}

GetData();
