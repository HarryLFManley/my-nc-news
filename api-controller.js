const endpointsJson = require("./endpoints.json");
const {fetchTopics, fetchArticleById, fetchArticles } = require("./api-model");
const articles = require("./db/data/test-data/articles");

exports.getApi = (req, res) => {
    res.status(200).send({ endpoints: endpointsJson});
}

exports.getTopics = (req, res) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    })
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;

    fetchArticleById(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch(next);
}

exports.getArticle = (req, res, next) => {


    
    fetchArticles().then((articles) => {
        res.status(200).send({ articles })
    }).catch(next)
}