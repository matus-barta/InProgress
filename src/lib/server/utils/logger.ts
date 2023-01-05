//import pino from 'pino';
import dayjs from 'dayjs';
import { logToDB } from '../handlers/log.handler';

/*  DOES NOT WORK WITH VITE BUNDLER - ESM ERROR - __dirname not found - worker.js missing
const log = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true
		}
	},
	timestamp: () => `,"time":"${dayjs().format()}"`
});
*/

class Logger {
	info(where: string, message: string) {
		console.log(`INFO: [${dayjs(Date.now()).format()}]: ${where} - ${message}`);
		logToDB('INFO', where, message);
	}
	warn(where: string, message: string) {
		console.warn(`WARN: [${dayjs(Date.now()).format()}]: ${where} - ${message}`);
		logToDB('WARN', where, message);
	}
	error(where: string, message: string) {
		console.error(`ERROR: [${dayjs(Date.now()).format()}]: ${where} - ${message}`);
		logToDB('ERROR', where, message);
	}
}

const log = new Logger();

export default log;
