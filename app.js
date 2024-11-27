const express = require("express");
const app = express();
const { getApi, getTopics, getArticleById, getArticle, getCommentsById } = require("./api-controller");
const { customErrorHandler, serverErrorhandler } = require("./errors");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticle);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.all("*", (req, res) => {
  res.status(400).send({ msg: "Bad request" });
});

app.use(customErrorHandler);

app.use(serverErrorhandler);

module.exports = app;
