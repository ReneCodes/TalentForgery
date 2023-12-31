const request = require("supertest");
const server = require("../dist/index");
const crypto = require("crypto");
const { Tutorial, User, Question } = require("../dist/models/Schemas");

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
  first_name: "Test1",
  last_name: "Test1",
  email: "test@gmail.com",
  tags: ['hello', 'world'],
  personal_email: "test12@gmail.com",
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm",
  phone: "123456789",
  department: "567-UFG",
};

const user2_info = {
  first_name: "Test2",
  last_name: "Test2",
  email: "test2@gmail.com",
  personal_email: "test122@gmail.com",
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm",
  phone: "12345678910",
  department: "567-UFG",
};

const question_ids = [
  {
    question: "This is the Question",
    options: [
      "this is an option",
      "when its green its the answer",
      "press delete to remove the tutorial"
    ], answer: "when its green its the answer"
  },
  {
    question: "hi",
    options: [
      "1", "2", "3"
    ],
    answer: "3"
  },
  {
    question: "Where is steve?",
    options: ["Detroit", "Michigan", "Orlando"],
    answer: "Detroit"
  }
];

const tags = [
  "hello",
  "world",
]

const tutorialInfo = {
  title: "hi how are you",
  video_url: "hello.mp4",
  description: "beesx",
  question_ids: JSON.stringify(question_ids),
  tags: JSON.stringify(tags),
  questions_shown: 2,
  access_date: "Wed, 21 Jun 2023 23:00:00 GMT",
  due_date: "Thu, 29 Jun 2023 23:00:00 GMT",
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
    expect(res.body.message).toEqual("Tutorial created.");
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
    expect(res.body).toEqual("Not enough information provided");
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

  it("Should retrieve all user tutorials", async () => {
    const res = await request(server)
      .get("/get_tutorials")
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("User should see all questions/questions related to tutorial", () => {
  let sessionToken;

  beforeAll(async () => {
    // Create a new user
    await User.create({
      role: "user",
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
    await Tutorial.destroy({ where: {} });
    await Question.destroy({ where: {} });
  });

  it("Should retrieve all questions from questions table", async () => {
    // Create the tutorial
    await Question.create({
      question: "This is the Question",
      options: [
        "this is an option",
        "when its green its the answer",
        "press delete to remove the tutorial",
      ],
      question_id: crypto.randomUUID(),
      answer: "when its green its the answer",
      tutorial_id: "122233eaddasdarrg-asdaf213dadgg",
    });

    await Question.create({
      question: "hi",
      options: ["1", "2", "3"],
      answer: "3",
      question_id: crypto.randomUUID(),
      tutorial_id: "122233eaddasdarrg-asdaf213dadkk",
    });

    // Retrieve all questions
    const getQuestionsResponse = await request(server)
      .get("/get_all_questions")
      .set("Content-Type", "application/json")
      .set("Cookie", [sessionToken]);

    expect(getQuestionsResponse.statusCode).toBe(200);
    expect(getQuestionsResponse.body.length).toBe(5);
  });
  it("it Should retrieve question for particular tutorial id", async () => {
    const tutorialId = "122233eaddasdarrg-asdaf213dadgg";

    // Create a tutorial
    await Tutorial.create({
      tutorial_id: tutorialId,
      creator_id: "creator-id",
      title: "Tutorial Title",
      questions_id: [],
      video_url: "https://example.com/tutorial-video",
      description: "Tutorial description",
      access_date: "2023-06-24",
      due_date: "2023-06-30",
      video_thumb: 'https://example.com/tutorial-video',
    });

    const response = await request(server)
      .post("/questions")
      .set("Cookie", [sessionToken])
      .send({ tutorial_id: tutorialId });

    expect(response.statusCode).toBe(200);
  });
  it("should return a 404 error if tutorial ID is invalid", async () => {
    const invalidTutorialId = "invalid-tutorial-id";

    const response = await request(server)
      .get(`/questions/${invalidTutorialId}`)
      .set("Cookie", [sessionToken]);

    expect(response.statusCode).toBe(404);
    expect(response.body).not.toHaveProperty("tutorial");
  });
});
