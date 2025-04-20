import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

let environment = process.env.NODE_ENV;
let port = process.env.PORT;

const config = {
    env: environment,
    port: port,
    debug : 'enable',
    cors :'enable',
    compression :'disable'
};

if (environment !== 'development') {
    config.env = 'production';
    config.port = 80;
    config.debug = 'disable';
    config.cors = 'disable';
    config.compression = 'enable';
};

export {config, app};