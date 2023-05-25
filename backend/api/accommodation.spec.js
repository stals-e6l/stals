const request = require('../mock/request');
const mongoose = require("mongoose");

let token = "";
let new_accommodation_id = "";

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('accommodation.spec.js', () => {

    it('Login 200 - Login SUCCESS', async () => {
        const response = await request.post('/api/sign-in').send({
            username: "jmdelacruz",
            password: "Password$12234",
        })

        token = response.body.data;

        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": token });
    })

    // ---------- CREATE ACCOMMODATION ---------- //

    it('Create Accommodation 201 - Create accommodation SUCCESS', async () => {
        // do work
        const response = await request.post('/api/accommodation').send({
            user_id: "646ebe59dcf312f09fafc19c",
            description: "string",
            name: "string",
            address: "string",
            type: "hotel",
            furnishing: "fully_furnished",
            min_price: 1000,
            max_price: 1200,
            size_sqm: 50,
            meters_from_uplb: 100,
            min_pax: 1,
            max_pax: 4,
            num_rooms: 2,
            num_beds: 2,
            num_views: 1,
            landmarks: ["string", "string"],
            cooking_rules: ["string", "string"],
            pet_rules: ["string", "string"],
            other_rules: ["string", "string"],
            safety_and_privacy: ["string", "string"],
            appliances: ["string", "string"],
            ammenities: ["string", "string"]
        }).set('Authorization', `Bearer ${token}`);
    
        new_accommodation_id = response.body.data._id;
    
        // assert
        expect(response.statusCode).toBe(201)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
        })

    
    // ---------- GET ACCOMMODATION BY ID ---------- //

    it('Get Accommodation 200 - Get Accommodation SUCCESS', async () => {
        // do work
        const response = await request.get('/api/accommodation/646ec612cc5938c8a9eb2896').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
    })

    it('Get Accommodation 404 - Get accommodation FAIL - Accommodation not found (Wrong Accommodation ID)', async () => {
        // do work
        const response = await request.get('/api/accommodation/646ec612cc5938c8a9ec3891').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(404)
        expect(response.body).toStrictEqual({ "success" : false, "messages": ["Error: Not found"]})
    })

    // ---------- GET ALL ACCOMMODATIONS ---------- //

    it('Get All Accommodations 200 - Get all accommodations SUCCESS', async () => {
        // do work
        const response = await request.get('/api/accommodation').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data }) 
    })

     // ---------- EDIT ACCOMMODATION BY ID ---------- //

     it('Edit Accommodation 200 - Edit accommodation SUCCESS', async () => {
        // do work
        const response = await request.put('/api/accommodation/646ec612cc5938c8a9eb2896').send({
            user_id: "646ebe59dcf312f09fafc19c",
            description: "string",
            name: "editted name",
            address: "string",
            type: "hotel",
            furnishing: "fully_furnished",
            min_price: 1000,
            max_price: 1200,
            size_sqm: 50,
            meters_from_uplb: 100,
            min_pax: 1,
            max_pax: 4,
            num_rooms: 2,
            num_beds: 2,
            num_views: 1,
            landmarks: ["string", "string"],
            cooking_rules: ["string", "string"],
            pet_rules: ["string", "string"],
            other_rules: ["string", "string"],
            safety_and_privacy: ["string", "string"],
            appliances: ["string", "string"],
            ammenities: ["string", "string"]
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
    })

    it('Edit Accommodation 404 - Edit accommodation FAIL (Accommodation not found)', async () => {
        // do work
        const response = await request.put('/api/accommodation/646ec612cc5938c8a9ec3997').send({
            user_id: "646ebe59dcf312f09fafc19c",
            description: "string",
            name: "string",
            address: "string",
            type: "hotel",
            furnishing: "fully_furnished",
            min_price: 1000,
            max_price: 1200,
            size_sqm: 50,
            meters_from_uplb: 100,
            min_pax: 1,
            max_pax: 4,
            num_rooms: 2,
            num_beds: 2,
            num_views: 1,
            landmarks: ["string", "string"],
            cooking_rules: ["string", "string"],
            pet_rules: ["string", "string"],
            other_rules: ["string", "string"],
            safety_and_privacy: ["string", "string"],
            appliances: ["string", "string"],
            ammenities: ["string", "string"]
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": [ "Error: Bad request" ] })
    })

    // ---------- DELETE ACCOMMODATION BY ID ---------- //

    it('Delete Accommodation 200 - Delete accommodation SUCCESS', async () => {
        // do work
        const response = await request.delete(`/api/accommodation/${new_accommodation_id}`).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": null })
    })

    it('Delete Accommodation 404 - Delete accommodation FAIL (Accommodation ID not found)', async () => {
        // do work
        const response = await request.delete(`/api/accommodation/${new_accommodation_id}`).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(404)
        expect(response.body).toStrictEqual({ "success": false, "messages": [ 'Error: Not found' ] })
    })

    

    
})