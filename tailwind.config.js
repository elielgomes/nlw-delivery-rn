/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/app/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				heading: ['Poppins_600SemiBold', 'sans-serif'],
				subtitle: ['Poppins_500Medium', 'sans-serif'],
				body: ['Poppins_400Regular', 'sans-serif'],
				bold: ['Poppins_700Bold', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

