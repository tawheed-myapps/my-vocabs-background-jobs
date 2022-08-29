"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const moment_1 = __importDefault(require("moment"));
// CRONS VARIABLES:
// everyday at 9 o clock:
const EVERY_DAY_AT_NINE = "0 9 * * *";
// seconds schedule (Every 10 seconds):
const EVERY_TEN_SECONDS = "*/10 * * * * *";
const DATE_FORMAT = "DD-MMM-YYYY HH:mm:ss";
const nowStr = () => {
    return moment_1.default(new Date()).format(DATE_FORMAT);
};
const main = () => {
    let service = {
        appName: "my-vocabs-background-jobs",
        startDate: new Date(),
        numberOfExecutions: 0,
    };
    console.log(`Service for ${service.appName} has started at ${moment_1.default(service.startDate).format(DATE_FORMAT)}`);
    node_schedule_1.default.scheduleJob(EVERY_TEN_SECONDS, () => {
        service.numberOfExecutions++;
        try {
            console.log(`Service has executed successfully ${service.numberOfExecutions} ${service.numberOfExecutions === 1 ? "time" : "times"} at ${nowStr()}`);
        }
        catch (err) {
            console.log(`Service has ran into an error on execution ${service.numberOfExecutions} at ${nowStr()}`);
            console.log("Error as follows: ");
            console.error(err);
        }
    });
};
if (require.main === module) {
    main();
}
