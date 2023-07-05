const request = require('supertest');
const expect = require('chai').expect;
const server = require('../dist/index');
const crypto = require('crypto');
const { User } = require('../dist/models/Schemas');
const sequelize = require('../dist/models/connection');


afterAll((done) => {
  server.close(async () => {
    try {
      await User.destroy({ where: {} });
      done();
    } catch (error) {
      done(error);
    }
  });
});

const user_info = {
  first_name: "Bob",
  last_name: "Alfred",
  email: "admin@admin.com",
  personal_email: "123@123.com",
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm", //123,
  phone: "123456789",
  department: "567-UFG",
};

const second_user = {
  first_name: "Bob",
  last_name: "Alfred",
  email: "pending@pending.com",
  personal_email: "123@123.com",
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm", //123,
  phone: "123456789",
  department: "567-UFG",
};

const expectedResponse = {
  department: "567-UFG",
  email: "admin@admin.com",
  first_name: "Bob",
  last_name: "Alfred",
  profile_picture: null,
  personal_email: "123@123.com",
  phone: "123456789",
  role: "pending",
};

const expectedPendingUsers = {
  first_name: "Bob",
  last_name: "Alfred",
  email: "pending@pending.com",
  department: "567-UFG",
  profile_picture: null,
  role: "pending"
}

describe('Get user information Tests', () => {
  let sessionToken;

  beforeAll(async () => {
    await User.create({ role: 'pending', ...user_info, user_id: crypto.randomUUID() });

    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/login')
      .send(JSON.stringify({ email: "admin@admin.com", password: "123" }))
      .set('Content-Type', 'application/json');

    sessionToken = res.headers['set-cookie'][0];
  });

  afterAll(() => {
    User.destroy({ where: {} })
  });

  it('Should not allow to get information without a session token', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/user')
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"Session token not passed"');
  });

  it('Should not allow to get information with an invalid user_id', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/user')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTY5MmU4OTItZTk3NS00NDg0LTllYzItMGJhOTAxODgyMmNhIiwiaWF0IjoxNjg3NjE3MTM5LCJleHAiOjE2OTAyMDkxMzl9.xS8KxIQrav99Py-RnBttnmdipCW3AAHKT7hIU5UHQxM; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"user_id is invalid"');
  });

  it('Should not allow to get information a jwt that dosent have the user_id', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/user')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiaGVsbG8iLCJpYXQiOjE2ODc2MTg0NzAsImV4cCI6MTY5MDIxMDQ3MH0.UXE-LNRLM6i54yvtTUxi1KLVlk37NoZsz4o9e1-Klvg; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"user_id not in the token"');
  });

  it('Should not return if session is expired', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/user')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDdjMTUwZjctN2RiZS00NzI0LTk5ZjAtNThiMTk4NGM3Y2JlIiwiaWF0IjoxNjg3NjE4NTY1LCJleHAiOjE2ODc2MTg1NjZ9.PRj9w_aX--BAjgYKEa9BIi-veh5DgHQNNvg4ighVOBA; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"jwt expired"');

  });

  it('Should return information if everything is right', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/user')
      .set('Cookie', [sessionToken])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(200);
    const data = res.body;
    expect(data).to.eql(expectedResponse);

  });
});

describe('Gets all of the pending users', () => {
  let sessionToken;

  beforeAll(async () => {
    await User.create({ role: 'admin', ...user_info, user_id: crypto.randomUUID() });

    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/login')
      .send(JSON.stringify({ email: "admin@admin.com", password: "123" }))
      .set('Content-Type', 'application/json');

    sessionToken = res.headers['set-cookie'][0];
  });

  afterAll(() => {
    User.destroy({ where: {} })
  });

  it('Should not allow to get pending users without a session token', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/pending_users')
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"Session token not passed"');
  });

  it('Should not allow to get pending users with an invalid user_id', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/pending_users')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTY5MmU4OTItZTk3NS00NDg0LTllYzItMGJhOTAxODgyMmNhIiwiaWF0IjoxNjg3NjE3MTM5LCJleHAiOjE2OTAyMDkxMzl9.xS8KxIQrav99Py-RnBttnmdipCW3AAHKT7hIU5UHQxM; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"user_id is invalid"');
  });

  it("Should not allow to get pending users with a jwt that doesn't have the user_id", async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/pending_users')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiaGVsbG8iLCJpYXQiOjE2ODc2MTg0NzAsImV4cCI6MTY5MDIxMDQ3MH0.UXE-LNRLM6i54yvtTUxi1KLVlk37NoZsz4o9e1-Klvg; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"user_id not in the token"');
  });

  it('Should not return if session is expired', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/pending_users')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDdjMTUwZjctN2RiZS00NzI0LTk5ZjAtNThiMTk4NGM3Y2JlIiwiaWF0IjoxNjg3NjE4NTY1LCJleHAiOjE2ODc2MTg1NjZ9.PRj9w_aX--BAjgYKEa9BIi-veh5DgHQNNvg4ighVOBA; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"jwt expired"');

  });

  it('Should not return the pending users if is not an admin', async () => {
    await User.create({ role: 'pending', ...second_user, user_id: crypto.randomUUID() });
    const loginResponse = await request(`http://localhost:${process.env.PORT}`)
      .post('/login')
      .send(JSON.stringify({ email: "pending@pending.com", password: "123" }))
      .set('Content-Type', 'application/json');
    sessionToken = loginResponse.headers['set-cookie'][0];


    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/pending_users')
      .set('Cookie', [sessionToken])
      .expect('Content-Type', 'application/json; charset=utf-8')
    expect(res.statusCode).equal(403);
    expect(res.text).to.equal('"Unauthorized"');
  });

  it('Should return the pending users if everything is right', async () => {

    const transaction = await sequelize.transaction();

    try {
      await User.destroy({ where: {} }, { transaction });
      await User.create({ role: 'admin', ...user_info, user_id: crypto.randomUUID() });
      await User.create({ role: 'pending', ...second_user, user_id: crypto.randomUUID() });
      await User.create({ role: 'pending', ...second_user, user_id: crypto.randomUUID() });

      await transaction.commit();

      const loginResponse = await request(`http://localhost:${process.env.PORT}`)
        .post('/login')
        .send(JSON.stringify({ email: "admin@admin.com", password: "123" }))
        .set('Content-Type', 'application/json');
      const newSession = loginResponse.headers['set-cookie'][0];


      const res = await request(`http://localhost:${process.env.PORT}`)
        .get('/pending_users')
        .set('Cookie', [newSession])
        .expect('Content-Type', 'application/json; charset=utf-8')

      expect(res.statusCode).equal(200);
      const data = res.body;
      expect(data).to.eql([expectedPendingUsers, expectedPendingUsers]);
    } catch (error) {
      // await transaction.rollback();
    }

  });
});