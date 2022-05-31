import schedule from 'node-schedule';
import moment from 'moment';
import { ga4Custom, ga3Custom } from '../component/ga4.js';

// 每日確認GA數據
schedule.scheduleJob('0 5 12 * * *', async function() {
    // let checkData = await checkGaData.checkGaData()
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}