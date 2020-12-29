import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const axios = require('axios');

const tezos = new TezosToolkit('https://delphinet.smartpy.io');

tezos.setProvider({ signer: new InMemorySigner('edskRf6hntyzJaC4Kv4ywGgPRVV2M12ubX5GkN8NxrmpXzuqBRmeppq3WhUtepahhnRRAeMQ1H44psNLmAC2M58R1A8WG5A4eD') });


const ApiEndpoints = [
    'https://api.coinbase.com/v2/prices/XTZ-USD/sell',
    'https://api.coinbase.com/v2/prices/XTZ-EUR/sell',
    'https://api.coinbase.com/v2/prices/XTZ-GBP/sell',
    'https://api.coinbase.com/v2/prices/XTZ-JPY/sell',
]

const SmartContract = [
    'KT1J9gYtCMeYCJxL63DUmB5ETyXQMaXFWD4B',
    'KT1Tj1zeVtXSQveYtY1sVEEomiymLadZi11k',
    'KT1TQiQCVxXicS38iQu7TBvFLcKhAewAstPY',
    'KT1WpZxUuLNxPJEy7V7fgfTSSbroucDxuW6s'
]

async function UpdateOracle(endpoint:string, address:string) {


   
    const response = await axios.get(endpoint);

    const amount = Math.floor(response.data.data.amount * 100)
    console.log(amount)

    var contract = await tezos.contract.at(address);

    var operation = await contract.methods.feedData(amount).send();

    await operation.confirmation();

}

var index = 3
UpdateOracle(ApiEndpoints[index],SmartContract[index])