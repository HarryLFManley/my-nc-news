const request = require("supertest")
const endpointsJson = require("../endpoints.json");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const { response } = require("express")

/* Set up your test imports here */

afterAll(() => {
  console.log("all tests have run")
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
