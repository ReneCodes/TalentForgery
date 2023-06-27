const request = require('supertest');
const expect = require('chai').expect;
const crypto = require('crypto');
const { User, Invites } = require('../dist/models/Schemas');

const server = require('../dist/index');

afterAll((done) => {
  server.close(async () => {
    try {
      await User.destroy({ where: {} });
      await Invites.destroy({ where: {} });
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
  password: "$2b$10$2D3duqAFVODAacQmGgjMtuQxzefQ48ovZmnZzMycCIo4OE5l.G/Xm", //123
  phone: "123456789",
  department: "567-UFG"
};

const profileInformation = {
  email: "admin@admin.com",
  password: "123"
}

let role = 'pending';
let sessionToken;

describe.only('Create a invite for new users', () => {

  beforeEach(async () => {
    await User.create({ role, ...user_info, user_id: crypto.randomUUID() });

    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/login')
      .send(JSON.stringify(profileInformation))
      .set('Content-Type', 'application/json')

    sessionToken = res.headers['set-cookie'][0];
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
    await Invites.destroy({ where: {} });
    role = role === 'admin' ? 'user' : 'admin';
  });

  it('Should not allow none admin users to get invites ', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/invite')
      .set('Cookie', [sessionToken])

    expect(res.status).to.eql(403);
    expect(res.text).to.equal('"Unauthorized"');
  });

  it('Should create a new invite if there are none', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/invite')
      .set('Cookie', [sessionToken])

    expect(res.status).to.eql(200);
    expect(typeof res.text).to.eql('string')
  });

  it('Should not allow to get information without a session token', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/invite')
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"Session token not passed"');
  });

  it('Should not allow to get information with an invalid user_id', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/invite')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTY5MmU4OTItZTk3NS00NDg0LTllYzItMGJhOTAxODgyMmNhIiwiaWF0IjoxNjg3NjE3MTM5LCJleHAiOjE2OTAyMDkxMzl9.xS8KxIQrav99Py-RnBttnmdipCW3AAHKT7hIU5UHQxM; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"user_id is invalid"');
  });

  it('Should not allow to get information a jwt that dosent have the user_id', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/invite')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiaGVsbG8iLCJpYXQiOjE2ODc2MTg0NzAsImV4cCI6MTY5MDIxMDQ3MH0.UXE-LNRLM6i54yvtTUxi1KLVlk37NoZsz4o9e1-Klvg; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"user_id not in the token"');
  });

  it('Should not return if session is expired', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .get('/invite')
      .set('Cookie', ['session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDdjMTUwZjctN2RiZS00NzI0LTk5ZjAtNThiMTk4NGM3Y2JlIiwiaWF0IjoxNjg3NjE4NTY1LCJleHAiOjE2ODc2MTg1NjZ9.PRj9w_aX--BAjgYKEa9BIi-veh5DgHQNNvg4ighVOBA; path=/'])
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(res.statusCode).equal(422);
    expect(res.text).to.equal('"jwt expired"');

  });

});