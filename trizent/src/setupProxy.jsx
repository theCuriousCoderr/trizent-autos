// const { createProxyMiddleware } = require('http-proxy-middleware');
// import { env } from './config';

// let baseUrl;
// if (env === "development") {
//   baseUrl = "http://localhost:4000"
// } else {
//   baseUrl = "https://trizent-autos-server.vercel.app"
// }
// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: `${baseUrl}`,
//       changeOrigin: true,
//     })
//   );
// }