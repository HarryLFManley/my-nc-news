const endpointsJson = require("./endpoints.json");
const {fetchTopics} = require("./api-model");

exports.getApi = (req, res) => {
    res.status(200).send({ endpoints: endpointsJson});
}

exports.getTopics = (req, res) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    })
}