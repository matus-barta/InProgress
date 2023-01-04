import dotenv from 'dotenv';
dotenv.config();

export const dev = process.env.DEV == 'true';
export const url = dev ? 'http://localhost:5173' : (process.env.URL as string);
export const clientId = process.env.CLIENT_ID as string | '';
export const authority = process.env.AUTHORITY as
	| string
	| 'https://login.microsoftonline.com/common/';
export const clientSecret = process.env.CLIENT_SECRET as string | '';
