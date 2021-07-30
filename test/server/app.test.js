const request = require("supertest");
const app = require("../../src/server/app");

describe("Test the all route", () => {
  test("It should return status code 200", () => {
    return request(app)
      .get("/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the add route", () => {
    test("It should return status code 200", () => {
      return request(app)
        .post("/add")
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toStrictEqual({message: 'data added'});
        });
    });
  });