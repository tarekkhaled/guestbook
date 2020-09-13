const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api/',{
        target : "http://localhost:3800",
        secure : false,
        changeOrigin : true
    }))
    app.use(createProxyMiddleware('/auth/',{
        target : "http://localhost:3800",
        secure : false,
        changeOrigin : true
    }))
}