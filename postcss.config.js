//const cssnano = require('cssnano') ; //we dont want any minify here
const autoprefixer = require('autoprefixer') ; 
//const purgecss = require('@fullhuman/postcss-purgecss') ; //this plugin is having some conflict with 'mini-css-extract-plugin'
module.exports = {
	plugins: [
		// cssnano({
		// 	preset: 'default' //for minify .css files	
		// }), 
		// purgecss({
		// 	content: ['./*.html','./src/*.html','./src/js/*.js'] ,
		// 	fontFace: true ,
		// 	keyframes: true 
		// }),
		autoprefixer
	]
}