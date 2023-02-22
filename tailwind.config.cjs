/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			h1: {
				fontSize: '2.5rem',
				lineHeight: '1.2',
			},
			h2: {
				fontSize: '2rem',
				lineHeight: '1.2',
			},
			h3: {
				fontSize: '1.75rem',
				lineHeight: '1.2',
			},
			h4: {
				fontSize: '1.5rem',
				lineHeight: '1.2',
			},
			h5: {
				fontSize: '1.25rem',
				lineHeight: '1.2',
			},
			h6: {
				fontSize: '1rem',
				lineHeight: '1.2',
			},
		},
	},
	plugins: [
	],
}
