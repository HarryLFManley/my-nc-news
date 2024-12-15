const express = require("express");
const app = express();
const { getApi, getTopics, getArticleById, getArticle, getCommentsById, postComments, patchArticleById, deleteCommentById } = require("./api-controller");
const { customErrorHandler, serverErrorhandler } = require("./errors");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticle);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postComments);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById)

app.all("*", (req, res) => {
  res.status(400).send({ msg: "Bad request" });
});

app.use(customErrorHandler);

app.use(serverErrorhandler);

module.exports = app;
