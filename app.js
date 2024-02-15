"use strict";
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');
const app = express();
const server = require("http").createServer(app);
const logger = require("morgan");
const responses = require("./src/helpers/responses");
const routes = require("./src/routes/index");
const helmet = require('helmet');
const cors = require('cors');
const express_rate_limit = require("express-rate-limit");
const limiter = express_rate_limit({
    windowMs: Number(process.env.HITINGTIME) * 60 * 1000,   /* 15 * 60 * 1000 15 minutes */
    max: Number(process.env.HITINGLIMIT),   /* 10 limit each IP to 100 requests per windowMs */
    message: 'Locked Access'
});

app.use(responses());
app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(express.json({
    limit: '50mb'
}));
app.use(limiter);
app.use(helmet());
app.set('trust proxy', 1);
app.use('/v1', routes);
app.use(async (error, req, res, next) => {
    console.log(error);
    return res.failure(error.message || error, {});
});
server.listen(process.env.PORT, async () => {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`App is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    connectDB();
});