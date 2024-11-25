const db = require("./db/connection");

exports.fetchTopics = () => {

    let sqlQuery = "SELECT * FROM topics;";

    return db.query(sqlQuery).then(({ rows }) => {
        return rows;
    });
};

exports.fetchArticleById = (article_id) => {

    let sqlQuery = "SELECT * FROM articles WHERE article_id = $1;"
    
    return db.query(sqlQuery, [article_id]).then((result) => {
        if (result.length === 0 || result.rows[0] === undefined) {
            return Promise.reject({ status: 404, msg: "Not found"});
        }
        return result.rows[0];
    });
};