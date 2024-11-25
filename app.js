const express = require("express");
const app = express();
const { getApi, getTopics, getArticleById } = require("./api-controller");
const { customErrorHandler, serverErrorhandler } = require("./errors");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(customErrorHandler);

app.use(serverErrorhandler);

module.exports = app;
