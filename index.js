var CronJob = require('cron').CronJob;
const axios = require('axios');

var job = new CronJob('1 * * * *', async () => {


    const response = await axios.get("https://api.coinbase.com/v2/prices/XTZ-USD/sell");

    const amount = response.data.data.amount * 100
    console.log(amount)



}, null, true, 'America/Los_Angeles');
job.start();