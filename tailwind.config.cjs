/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			h1: {
				fontSize: '2.5rem',
				lineHeight: '1.2',
			},
		},
	},
	plugins: [],
}
