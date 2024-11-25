const request = require("supertest")
const endpointsJson = require("../endpoints.json");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

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
