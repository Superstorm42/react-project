const { proxy } = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: process.env.REACT_APP_PROXY_SITE,
			changeOrigin: true,
		})
	);
};
