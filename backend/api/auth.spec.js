const request = require('../mock/request')
const mongoose = require("mongoose");

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('auth.spec.js', () => {
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

    console.log(response.body)
    expect(response.statusCode).toBe(201);
    
  })

  // sign up with invalid fields

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
    
    console.log(response.body)
    expect(response.statusCode).toBe(200);
  })

  // sign in no user

  // sign in wrong password

  // sign out from signed in

  // sign out without signing in

  // me endpoint while signed in

  // me endpoint while not signed in
})
