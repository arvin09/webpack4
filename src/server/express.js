import express from 'express';
const server = express();
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
console.log('NODE_ENV server', process.env.NODE_ENV);

if (!isProd) {
    const webpack = require("webpack");
    const config = require('../../config/webpack.dev');
    const compiler = webpack(config);

    const webpackMiddleware = require("webpack-dev-middleware")(
        compiler,
        config.devServer
    )

    const webpackHotMiddleware = require("webpack-hot-middleware")(
        compiler,
        config.devServer
    )

    server.use(webpackHotMiddleware);
    server.use(webpackMiddleware);
}


// const staticMiddleware = express.static('dist');
// server.use(staticMiddleware);

const expressStaticGzip = require("express-static-gzip")
server.use(
    expressStaticGzip("dist",{
        enableBrotli: true
    }
));
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`server is listening on  http://localhost:${PORT} in ${process.env.NODE_ENV}`);
})