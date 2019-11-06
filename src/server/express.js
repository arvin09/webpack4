import express from 'express';
import path from 'path';

const server = express();

const webpack = require("webpack");
const config = require('../../config/webpack.dev');
const compiler = webpack(config);

const webpackMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
)

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

server.use(webpackHotMiddleware);
server.use(webpackMiddleware);

const staticMiddleware = express.static('dist');

server.use(staticMiddleware);

server.listen("9090", () => {
    console.log('server is listening on port 9090');
})