const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/search',
        createProxyMiddleware({
            target: 'http://localhost:' + process.env.FLASK_PORT,
            changeOrigin: true,
        })
    );
};
