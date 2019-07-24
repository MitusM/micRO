module.exports = () => {
	return {
		module: {
			rules: [{
				test: /\.svg/,
				use: {
					loader: 'svg-url-loader',
					options: {}
				}
	            }]
		}
	};
};
