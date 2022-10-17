const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    // app.use(
    //     createProxyMiddleware("/api/method/work.api.login.get_access_api_token", {
    //       target: "http://work.8848digitalerp.com",
    //       secure : false,
    //       changeOrigin: true,
    //     })
    //   );

//   app.use(
//     createProxyMiddleware("/api/resource/Client/", {
//       target: "http://work.8848digitalerp.com",
//       secure : false,
//       changeOrigin: true,
//     })
//   );
};
