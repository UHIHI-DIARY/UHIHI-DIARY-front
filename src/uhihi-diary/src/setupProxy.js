const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api',{
      target: 'http://132.226.237.23:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api' : ''
      }
    })
  );
};