const { rows } = require("pg/lib/defaults");
const db = require("./db/connection");

exports.fetchTopics = () => {
  let sqlQuery = "SELECT * FROM topics;";

  return db.query(sqlQuery).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleById = (article_id) => {
  let sqlQuery = "SELECT * FROM articles WHERE article_id = $1;";

  return db.query(sqlQuery, [article_id]).then((result) => {
    if (result.length === 0 || result.rows[0] === undefined) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return result.rows[0];
  });
};

exports.fetchArticles = () => {
  let sqlQuery = "SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;"

  return db.query(sqlQuery).then(({ rows }) => {
    return rows
  })
}

exports.fetchCommentsById = (article_id) => {
  let sqlQuery = "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;"

  return db.query(sqlQuery, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" })
    }
    return rows
  })
}