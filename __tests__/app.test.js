const request = require("supertest")
const endpointsJson = require("../endpoints.json");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const { response } = require("express");

/* Set up your test imports here */

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

/* Set up your beforeEach & afterAll functions here */

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of topics", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then((response) => {
      expect(response.body.topics.length).toBe(3);
      response.body.topics.forEach((topic) => {
        expect(typeof topic.description).toBe("string");
        expect(typeof topic.slug).toBe("string");
      });
    })
  })
})

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with a single article object to the client", () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then((response) => {
      expect(typeof response.body.article.article_id).toBe('number');
      expect(typeof response.body.article.author).toBe('string');
      expect(typeof response.body.article.title).toBe('string');
      expect(typeof response.body.article.body).toBe('string');
      expect(typeof response.body.article.topic).toBe('string');
      expect(typeof response.body.article.created_at).toBe('string');
      expect(typeof response.body.article.votes).toBe('number');
      expect(typeof response.body.article.article_img_url).toBe('string');
    })
  })
  test("404: Responds with error message if the id is invalid", () => {
    return request(app)
    .get("/api/articles/99987")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Not found")
    })
  })
})
