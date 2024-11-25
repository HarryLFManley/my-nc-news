const express = require("express")
const app = express()
const { getApi } = require("./api.controller")


app.get("/api", getApi);

module.exports = app