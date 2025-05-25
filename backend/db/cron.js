import cron from 'cron';
import https from 'https';


const job = new cron.CronJob("*/14 * * * *", function(){
    https.get('https://knows.onrender.com', (res) => {
       if(res.statusCode == 200) {
            console.log(`Request Successful. Status Code: ${res.statusCode}`);
        }else{
            console.log(`Request Failed. Status Code: ${res.statusCode}`);
        }

    }).on('error', (e) => {
        console.error(e);
    });
})

export default  job;