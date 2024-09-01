import app from "../../src/app";
import request from "supertest";

describe("GET /tutorials (with no tutorials in database)", () => {
  test("responds with empty array", async () => {
    const response = await request(app).get("/tutorials");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /tutorials (with tutorials in database)", () => {
  const testTutorial1 = {
    title: "Test Tutorial 1",
    description: "Test Description 1",
    level: "beginner",
    topics: [{ name: "Test Topic 1" }, { name: "Test Topic 2" }],
  };
  const testTutorial2 = {
    title: "Test Tutorial 2",
    description: "Test Description 2",
    level: "intermediate",
    topics: [{ name: "Test Topic 2" }],
  };

  beforeAll(async () => {
    await request(app).post("/tutorials").send(testTutorial1);
    await request(app).post("/tutorials").send(testTutorial2);
  });

  test("responds with all tutorials", async () => {
    const response = await request(app).get("/tutorials");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);

    const [response1, response2] = response.body;

    expect(response1.title).toBe(testTutorial1.title);
    expect(response1.description).toBe(testTutorial1.description);
    expect(response1.level).toBe(testTutorial1.level);
    expect(response1.topics).toEqual([
      { name: "Test Topic 1", id: 1, createdAt: expect.any(String) },
      { name: "Test Topic 2", id: 2, createdAt: expect.any(String) },
    ]);
    expect(response1.lessons).toEqual([]);

    expect(response2.title).toBe(testTutorial2.title);
    expect(response2.description).toBe(testTutorial2.description);
    expect(response2.level).toBe(testTutorial2.level);
    expect(response2.topics).toEqual([
      { name: "Test Topic 2", id: 2, createdAt: expect.any(String) },
    ]);
    expect(response2.lessons).toEqual([]);
  });
});
