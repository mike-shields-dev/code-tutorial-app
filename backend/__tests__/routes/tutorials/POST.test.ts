import app from "../../../src/app";
import request from "supertest";
import isTutorial from "../../../../shared/type_guards/isTutorial";

describe("POST /tutorials", () => {
  test("responds with status code 400 (Bad Request), if tutorial title is missing", async () => {
    const tutorial = {
      description: "Test Tutorial Description",
      is_published: true,
    };

    const response = await request(app).post("/tutorials").send(tutorial);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        "Validation failed! Required fields: title (non-empty string), description (non-empty string) is_published (boolean)",
    });
  });

  test("responds with status code 400 (Bad Request), if description is missing", async () => {
    const tutorial = {
      title: "Test Tutorial",
      is_published: true,
    };

    const response = await request(app).post("/tutorials").send(tutorial);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        "Validation failed! Required fields: title (non-empty string), description (non-empty string) is_published (boolean)",
    });
  });

  test("responds with status code 400 (Bad Request), if is_published is missing", async () => {
    const tutorial = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
    };

    const response = await request(app).post("/tutorials").send(tutorial);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        "Validation failed! Required fields: title (non-empty string), description (non-empty string) is_published (boolean)",
    });
  });

  test("creates a new Tutorial", async () => {
    const tutorial: ITutorial = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
      is_published: true,
    };

    const response = await request(app).post("/tutorials").send(tutorial);

    expect(response.status).toBe(201);

    // Check if response.body satisfies the ITutorial interface
    expect(isTutorial(response.body)).toBe(true);

    // Check that the response body contains the expected properties
    expect(response.body).toMatchObject({
      id: 1,
      ...tutorial,
    });

    // Confirm that the tutorial was saved to the database
    const savedTutorial = (await request(app).get(`/tutorials`)).body[0];

    expect(savedTutorial).toMatchObject(response.body);
  });
});
