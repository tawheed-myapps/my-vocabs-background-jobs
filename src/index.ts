import scheduler from 'node-schedule';
import moment from 'moment';
const { name: appName } = require("./../package.json");



// CRONS VARIABLES:
// everyday at 9 o clock:
const EVERY_DAY_AT_NINE = "0 9 * * *";
// seconds schedule (Every 10 seconds):
const EVERY_TEN_SECONDS = "*/10 * * * * *";

const DATE_FORMAT = "DD-MMM-YYYY HH:mm:ss";



const nowStr = () => {
    return moment(new Date()).format(DATE_FORMAT);
}



const main = () => {
    let service = {
        appName,
        startDate: new Date(),
        numberOfExecutions: 0,
    };

    console.log(`Service for ${appName} has started at ${moment(service.startDate).format(DATE_FORMAT)}`);

    scheduler.scheduleJob(EVERY_TEN_SECONDS, () => {
        service.numberOfExecutions++;
        try {
            console.log(`Service has executed successfully ${service.numberOfExecutions} ${service.numberOfExecutions === 1 ? "time" : "times"} at ${nowStr()}`);
        } catch(err) {
            console.log(`Service has ran into an error on execution ${service.numberOfExecutions} at ${nowStr()}`);
            console.log("Error as follows: ");
            console.error(err);
        }
    });
}


if(require.main === module) {
    main();
}