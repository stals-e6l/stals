const request = require('../mock/request');
const mongoose = require("mongoose");

let token = "";
let new_report_id = "";

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


describe('report.spec.js', () => {

    it('Login 200 - Login SUCCESS', async () => {
        const response = await request.post('/api/sign-in').send({
            username: "string",
            password: "Helloworld@123",
        })

        token = response.body.data;

        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": token });
    })

    
    // ---------- CREATE REPORT ---------- //

    it('Create Report 201 - Create report SUCCESS', async () => {
    // do work
    const response = await request.post('/api/report').send({
        user_id: "6465f153a51eae051457fe86",
        pdf_url: "https://www.google.com",
    }).set('Authorization', `Bearer ${token}`);

    new_report_id = response.body.data._id;

    // assert
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
    })

    it('Create Report 400 - Create report FAIL - Not a URL', async () => {
        // do work
        const response = await request.post('/api/report').send({
            user_id: "6465f153a51eae051457fe86",
            pdf_url: "hello world",
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: pdf_url: The provided URL for the report is not valid"] })
    })

    it('Create Report 400 - Create report FAIL - Empty URL', async () => {
        // do work
        const response = await request.post('/api/report').send({
            user_id: "6465f153a51eae051457fe86",
            pdf_url: "",
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: pdf_url: PDF URL is required"] })
    })

    it('Create Report 400 - Create report FAIL - User not found', async () => {
        // do work
        const response = await request.post('/api/report').send({
            user_id: "6465f153a51eae051457fe87",
            pdf_url: "https://www.google.com",
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: user_id: The user generating the report does not exist"] })
    })


    // ---------- GET REPORT BY ID ---------- //

    it('Get Report 200 - Get report SUCCESS', async () => {
        // do work
        const response = await request.get('/api/report/6465ef7e5aec5a13ef4b82be').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
    })

    it('Get Report 404 - Get report FAIL - User not found (Wrong User ID)', async () => {
        // do work
        const response = await request.get('/api/report/6465ef7e5aec5a13ef4b82bf').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(404)
        expect(response.body).toStrictEqual({ "success" : false, "messages": ["Error: Not found"]})
    })

    
    // ---------- GET ALL REPORTS ---------- //

    it('Get All Reports 200 - Get all reports SUCCESS', async () => {
        // do work
        const response = await request.get('/api/report').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data }) 
    })

    // ---------- EDIT REPORT BY ID ---------- //

    it('Edit Report 200 - Edit report SUCCESS', async () => {
        // do work
        const response = await request.put('/api/report/6465ef7e5aec5a13ef4b82be').send({
            user_id: "6465f153a51eae051457fe86",
            pdf_url: "https://facebook.com"
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
    })

    it('Edit Report 400 - Edit report FAIL (Empty URL)', async () => {
        // do work
        const response = await request.put('/api/report/6465cc855533d3b50db51dc6').send({
            user_id: "6465f153a51eae051457fe86",
            pdf_url: ""
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: pdf_url: PDF URL is required"] })
    })

    it('Edit Report 400 - Edit report FAIL (Not a URL)', async () => {
        // do work
        const response = await request.put('/api/report/6465cc855533d3b50db51dc6').send({
            user_id: "6465f153a51eae051457fe86",
            pdf_url: "hello world"
        }).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: pdf_url: The provided URL for the report is not valid"] })
    })

    // ---------- DELETE REPORT BY ID ---------- //

    it('Delete Report 200 - Delete report SUCCESS', async () => {
        // do work
        const response = await request.delete('/api/report/' + new_report_id).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": null })
    })

    it('Delete Report 404 - Delete report FAIL (User ID not found)', async () => {
        // do work
        const response = await request.delete('/api/report/' + new_report_id).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(404)
        expect(response.body).toStrictEqual({ "success": false, "messages": [ 'Error: Not found' ] })
    })

})