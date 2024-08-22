import app from "../../src/app";
import request from "supertest";

describe("tutorials route", () => {
  describe("with empty Tutorial table", () => {
    test("GET /tutorials, returns an empty array", async () => {
      const response = await request(app).get("/tutorials");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});
