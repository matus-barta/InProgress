import { nanoid } from 'nanoid';

export const generateSessionId = () => nanoid(64);
