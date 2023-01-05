//import pino from 'pino';
import dayjs from 'dayjs';

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
	}
	warn(where: string, message: string) {
		console.warn(`WARN: [${dayjs(Date.now()).format()}]: ${where} - ${message}`);
	}
	error(where: string, message: string) {
		console.error(`ERROR: [${dayjs(Date.now()).format()}]: ${where} - ${message}`);
	}
}

const log = new Logger();

export default log;
