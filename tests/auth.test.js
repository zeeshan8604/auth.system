const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/db");

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await db.execute("DELETE FROM users");
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should retrieve profile of logged-in user", async () => {
    const loginRes = await request(app).post("/api/login").send({
      email: "test@example.com",
      password: "testpassword",
    });

    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", loginRes.body.token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("username", "testuser");
  });
});
