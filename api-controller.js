const endpointsJson = require("./endpoints.json");
const {
  fetchTopics,
  fetchArticleById,
  fetchArticles,
  fetchCommentsById,
  addComment,
} = require("./api-model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

exports.getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;

  fetchCommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComments = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;

  comment.article_id = parseInt(article_id);

  addComment(comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
