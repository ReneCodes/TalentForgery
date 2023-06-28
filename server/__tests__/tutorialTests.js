const request = require("supertest");
const server = require("../dist/index");
const crypto = require("crypto");
const { Tutorial, User } = require("../dist/models/Schemas");
const jwt = require("jsonwebtoken");

afterAll((done) => {
  server.close(async () => {
    try {
      await Tutorial.destroy({ where: {} });
      done();
    } catch (error) {
      done(error);
    }
  });
});

const user1_info = {
  inviteID: "testInviteID",
  first_name: "Test1",
  last_name: "Test1",
  email: "test@gmail.com",
  personal_email: "test12@gmail.com",
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm",
  phone: "123456789",
  department: "567-UFG",
};

const user2_info = {
  inviteID: "test2InviteID",
  first_name: "Test2",
  last_name: "Test2",
  email: "test2@gmail.com",
  personal_email: "test122@gmail.com",
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm",
  phone: "12345678910",
  department: "567-UFG",
};

const tutorialInfo = {
  title: "Onboarding",
  video_url: "https://example.com/onboarding",
  description: "Short video about onboarding",
  question_ids: ["51", "17", "21"],
  questions_shown: ["question03", "question07", "question55"],
  tags: ["new stuff", "fresh start", "Some nice security"],
  access_date: "2023-06-21T10:30:00Z",
  due_date: "2023-07-25T23:59:59Z",
};

describe("Tutorials shouldn't be seen or created if the user is logged out", () => {
  it("Shouldn't be able to create a tutorial if it is not logged in", async () => {
    const res = await request(server)
      .post("/create_tutorial")
      .send(tutorialInfo)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual("Session token not passed");
  });
  it("Shoudn't be able to see tutorials if it's not logged in", async () => {
    const res = await request(server)
      .get("/get_all_tutorials")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual("Session token not passed");
  });
});

describe("Admin create/see tutorials", () => {
  let sessionToken;

  beforeAll(async () => {
    // Create a new user
    await User.create({
      role: "pending",
      ...user1_info,
      user_id: crypto.randomUUID(),
    });
    await User.create({
      role: "admin",
      ...user2_info,
      user_id: crypto.randomUUID(),
    });

    const loginResponse = await request(`http://localhost:${process.env.PORT}`)
      .post("/login")
      .send({
        email: user2_info.email,
        password: "123",
      })
      .set("Content-Type", "application/json");

    const userId = loginResponse.body.user_id;
    sessionToken = loginResponse.headers["set-cookie"][0];

    expect(loginResponse.statusCode).toBe(200);
  });

  it("Should create a tutorial if admin is logged in", async () => {
    const res = await request(server)
      .post("/create_tutorial")
      .send(tutorialInfo)
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual("Tutorial created.");
  });

  it("Should not be able to create incomplete tutorial", async () => {
    const res = await request(server)
      .post("/create_tutorial")
      .send({
        video_url: "https://example.com/onboarding",
        description: "Short video about onboarding",
        question_ids: ["51", "17", "21"],
        questions_shown: ["question03", "question07", "question55"],
      })
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("All fields are required");
  });
  it("Should retrieve all tutorials", async () => {
    const res = await request(server)
      .get("/get_all_tutorials")
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    // Clean up the user records
    await User.destroy({ where: {} });
  });
});

describe("User create/see tutorials", () => {
  let sessionToken;

  beforeAll(async () => {
    // Create a new user
    await User.create({
      role: "pending",
      ...user1_info,
      user_id: crypto.randomUUID(),
    });

    const loginResponse = await request(`http://localhost:${process.env.PORT}`)
      .post("/login")
      .send({
        email: user1_info.email,
        password: "123",
      })
      .set("Content-Type", "application/json");

    const userId = loginResponse.body.user_id;
    sessionToken = loginResponse.headers["set-cookie"][0];

    expect(loginResponse.statusCode).toBe(200);
  });
  afterAll(async () => {
    // Clean up the user records
    await User.destroy({ where: {} });
  });

  it("Shouldn't be able to create a tutorial if user is logged in", async () => {
    const res = await request(server)
      .post("/create_tutorial")
      .send(tutorialInfo)
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual("Unauthorized");
  });

  it("Should retrieve all tutorials", async () => {
    const res = await request(server)
      .get("/get_all_tutorials")
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });