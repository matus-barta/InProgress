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
	info(message: any) {
		console.log(`[${dayjs(Date.now()).format()}]: ${message}`);
	}
	warn(message: any) {
		console.warn(`[${dayjs(Date.now()).format()}]: ${message}`);
	}
	error(message: any) {
		console.error(`[${dayjs(Date.now()).format()}]: ${message}`);
	}
}

const log = new Logger();

export default log;
