import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		container: {
  			center: true,
  			padding: {
  				default: '1rem',
  				xs: '1rem',
  				sm: '1rem',
  				lg: '4rem',
  				xl: '7rem'
  			}
  		},
  		fontFamily: {
  			clash: [
  				'Clash Display',
  				'sans-serif'
  			]
  		},
		  backgroundImage: {
			bgUpdate: 'linear-gradient(to right, #ffcc00, #2d634a)', // Gradient for bgUpdate
			bgSMUpdate: 'linear-gradient(to bottom, #ffcc00, #2d634a)', // Gradient for bgUpdate
			// bgUpdate: 'linear-gradient(to right, #111e5d, #3f2785)',
		  },
  		backgroundColor: {
  			bgCustom: 'rgba(13, 13, 13, 0.56)',
  		},
  		colors: {
  			pink: '#FF99C0',
  			green: '#6D9985',
  			yellow: '#F9D442',
  			purple: '#5D3C7F',
			// red:'#ff397f',
			red:'#2d634a',

			spray:'#71ecde',
			blue:'#2d634a',
			// blue:'#2d429c',
			// darkBlue: '#111e5d',
			darkBlue: "#30a670",
			customYellow: "#ffcc00",
			customGreen: "#2d634a"
  		},
  		boxShadow: {
  			custom: '0px 7px 4px 0px rgba(140, 140, 140, 0.25)',
  			customMd: '0px 4px 4px 0px rgba(72, 72, 72, 0.25)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
