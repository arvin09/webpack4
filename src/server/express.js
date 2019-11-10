import express from 'express';
const server = express();
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
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


const staticMiddleware = express.static('dist');

server.use(staticMiddleware);

const PORT = process.env.PORT || 9090;

server.listen(PORT, () => {
    console.log(`server is listening on  http://localhost:${PORT}`);
})