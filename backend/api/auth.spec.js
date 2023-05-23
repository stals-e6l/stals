const request = require('../mock/request')
const mongoose = require("mongoose");

let token = "";

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('auth.spec.js', () => {
  // sign up success
  it('sign up with valid request', async function () {
    const payload = 
    {
        full_name: {
            first_name: "string",
            middle_name: "string",
            last_name: "string"
        },
        gender: "female",
        phone: {
            landline: "45174601",
            mobile: "+632254527793"
        },
        address: {
            home: "string",
            current: "string"
        },
        biography: "string",
        birthday: "2023-05-17",
        username: "useruser",
        password: "Password0*",
        email: "sample@email.com",
        avatar: {
            url: "string"
        },
        role: "owner",
        organization: "string"
    }

    const response = await request.post('/api/sign-up')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body.data.username).toBe("useruser");
  })

  // signing up with password not matching criteria
  it('does not sign up due to invalid password', async function () {
    const payload = 
    {
        full_name: {
            first_name: "string",
            middle_name: "string",
            last_name: "string"
        },
        gender: "female",
        phone: {
            landline: "45174601",
            mobile: "+632254527793"
        },
        address: {
            home: "string",
            current: "string"
        },
        biography: "string",
        birthday: "2023-05-17",
        username: "username",
        password: "asdf",
        email: "sample1@email.com",
        avatar: {
            url: "string"
        },
        role: "owner",
        organization: "string"
    }

    const response = await request.post('/api/sign-up')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body.messages).toStrictEqual([
        "ValidationError: password: Password should have a minimum of 8 characters and must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ]);
  })

  // sign in success
  it('sign in successfully', async function (){
    const payload = 
    {
        username: "useruser",
        password: "Password0*"
    }
    
    const response = await request.post('/api/sign-in')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    
    token = response.body.data;

    expect(response.statusCode).toBe(200);
    expect(token).toBeTruthy();
  })

  // sign in no user
  it('sign in but user does not exist', async function (){
    const payload = 
    {
        username: "nouser",
        password: "Password0*"
    }
    
    const response = await request.post('/api/sign-in')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    
    expect(response.statusCode).toBe(400);
    expect(response.body.messages).toStrictEqual([
        "Error: We don't know this user. Try to sign up."
    ]);
  })

  // sign in wrong password
  it('sign in but password is wrong', async function (){
    const payload = 
    {
        username: "useruser",
        password: "Wordpass0*"
    }
    
    const response = await request.post('/api/sign-in')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    
    expect(response.statusCode).toBe(400);
    expect(response.body.messages).toStrictEqual([
        "Error: Password is incorrect"
    ]);
  })

  // me endpoint while signed in
  it('retrieve me success', async function (){
    const response = await request.get('/api/me')
    .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.data.username).toBe("useruser");
  })

  // sign out from signed in
  it('sign out normally', async function (){
    const response = await request.post('/api/sign-out')
    .set('Authorization', `Bearer ${token}`);
    
    token = "";

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe('You are successfully logged out!');
  })

  // me endpoint while not signed in
  it('retrieve me while not signed in', async function (){
    const response = await request.get('/api/me');

    expect(response.statusCode).toBe(401);
    expect(response.body.messages).toStrictEqual([
        "Error: Your request needs to be authenticated"
    ]);
  })

  // sign out without signing in
  it('sign out while not signed in', async function (){
    const response = await request.post('/api/sign-out');

    expect(response.statusCode).toBe(401);
    expect(response.body.messages).toStrictEqual([
        "Error: Your request needs to be authenticated"
    ]);
  })
})
