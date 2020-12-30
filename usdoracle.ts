import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const axios = require('axios');
var CronJob = require('cron').CronJob;


const tezos = new TezosToolkit('https://delphinet.smartpy.io');

tezos.setProvider({ signer: new InMemorySigner('edskRf6hntyzJaC4Kv4ywGgPRVV2M12ubX5GkN8NxrmpXzuqBRmeppq3WhUtepahhnRRAeMQ1H44psNLmAC2M58R1A8WG5A4eD') });


const ApiEndpoint = "https://api.coinbase.com/v2/prices/XTZ-USD/sell"

const SmartContract = "KT1J9gYtCMeYCJxL63DUmB5ETyXQMaXFWD4B"


var job = new CronJob('* * * * *', async () => {


    const response = await axios.get(ApiEndpoint);

    const amount = Math.floor(response.data.data.amount * 100);
    
    console.log(amount);

    var contract = await tezos.contract.at(SmartContract);
    
    console.log("Intiating Transaction");
    
    var operation = await contract.methods.feedData(amount).send();

    await operation.confirmation();


}, null, true, 'America/Los_Angeles');
job.start(); 