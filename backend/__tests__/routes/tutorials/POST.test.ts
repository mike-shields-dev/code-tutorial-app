import { log } from "console";
import app from "../../../src/app";
import request from "supertest";

describe("POST /tutorials", () => {
  test("correctly handles req body not containing an object", async () => {
    const response1 = await request(app).post("/tutorials").send();

    expect(response1.status).toBe(400);
    expect(response1.body).toEqual({
      message: "Validation failed",
      errors: ["Request body must be non-empty object"],
    });

    const response2 = await request(app).post("/tutorials").send("string");

    expect(response2.status).toBe(400);
    expect(response2.body).toEqual({
      message: "Validation failed",
      errors: ["Request body must be non-empty object"],
    });

    const response3 = await request(app).post("/tutorials").send({});

    expect(response3.status).toBe(400);
    expect(response3.body).toEqual({
      message: "Validation failed",
      errors: ["Request body must be non-empty object"],
    });
  });

  test("correctly handles missing 'title' property", async () => {
    const tutorialWithoutTitle = {
      description: "Test Tutorial Description",
      level: "beginner",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialWithoutTitle);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          constraints: {
            isDefined: "title should not be null or undefined",
            isLength: "title must be longer than or equal to 1 characters",
          },
          property: "title",
        },
      ],
      message: "Validation failed!",
    });
  });

  test("correctly handles 'title' property being an empty string", async () => {
    const tutorialWithEmptyTitle = {
      title: "",
      description: "Test Tutorial Description",
      level: "beginner",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialWithEmptyTitle);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          constraints: {
            isLength: "title must be longer than or equal to 1 characters",
          },
          property: "title",
        },
      ],
      message: "Validation failed!",
    });
  });

  test("correctly handles missing 'description' property", async () => {
    const tutorialWithoutDescription = {
      title: "Test Tutorial",
      level: "beginner",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialWithoutDescription);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          constraints: {
            isDefined: "description should not be null or undefined",
            isLength:
              "description must be longer than or equal to 1 characters",
          },
          property: "description",
        },
      ],
      message: "Validation failed!",
    });
  });

  test("correctly handles 'description' property being an empty string", async () => {
    const tutorialWithEmptyDescription = {
      title: "Test Tutorial",
      description: "",
      level: "beginner",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialWithEmptyDescription);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          constraints: {
            isLength:
              "description must be longer than or equal to 1 characters",
          },
          property: "description",
        },
      ],
      message: "Validation failed!",
    });
  });

  test("correctly handles missing 'level' property", async () => {
    const tutorialNoLevel = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialNoLevel);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          constraints: {
            isDefined: "level should not be null or undefined",
            isIn: "level must be one of the following values: beginner, intermediate, advanced",
          },
          property: "level",
        },
      ],
      message: "Validation failed!",
    });
  });

  test("correctly handles 'level' property not being a valid level", async () => {
    const tutorialInvalidLevel = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
      level: "invalid",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialInvalidLevel);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          constraints: {
            isIn: "level must be one of the following values: beginner, intermediate, advanced",
          },
          property: "level",
        },
      ],
      message: "Validation failed!",
    });
  });

  test("correctly handles missing 'topics' property", async () => {
    const tutorialNoTopics = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
      level: "beginner",
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialNoTopics);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Validation failed!",
      errors: [
        {
          property: "topics",
          constraints: {
            isDefined: "topics should not be null or undefined",
            arrayNotEmpty: "At least one topic is required",
          },
        },
      ],
    });
  });

  test("correctly handles 'topics' property being an empty array", async () => {
    const tutorialEmptyTopics = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
      level: "beginner",
      topics: [],
      lessons: [],
    };

    const response = await request(app)
      .post("/tutorials")
      .send(tutorialEmptyTopics);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Validation failed!",
      errors: [
        {
          property: "topics",
          constraints: { arrayNotEmpty: "At least one topic is required" },
        },
      ],
    });
  });

  test("creates a new tutorial with valid request body", async () => {
    const tutorial = {
      title: "Test Tutorial",
      description: "Test Tutorial Description",
      level: "beginner",
      topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
      lessons: [],
    };

    const response = await request(app).post("/tutorials").send(tutorial);

    log("RESPONSE BODY:", response.body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      ...tutorial,
      id: 1,
      createdAt: expect.any(String),
      is_published: false,
      topics: [
        { id: 1, name: "Test Topic 1", createdAt: expect.any(String) },
        { id: 2, name: "Test Topic 2", createdAt: expect.any(String) },
      ],
    });
  });
});
