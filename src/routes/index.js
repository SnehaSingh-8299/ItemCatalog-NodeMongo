const express = require("express");
const route = express.Router();
const authRoutes = require('./authRoutes');
const itemRoutes = require("./itemRoutes");

route.use("/auth", authRoutes);
route.use("/item", itemRoutes);

module.exports = route;