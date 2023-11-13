module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,css,js,json,html,svg}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};