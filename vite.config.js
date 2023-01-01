import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  	return {
		plugins: [sveltekit()],
		ssr: {
			external: ["@prisma/client"],
		},
  	};
});

/*
/** @type {import('vite').UserConfig} *//*
const config = {
	plugins: [sveltekit()]
};

export default config;
*/