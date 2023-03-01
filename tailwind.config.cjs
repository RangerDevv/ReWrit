/** @type {import('tailwindcss').Config} */
module.exports = {
	// content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'], 
	// make an exception for the `/src/components/getdocs.svelte` file
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', '!./src/components/svelte/getdocs.svelte'],
	theme: {},
	plugins: [],
}
