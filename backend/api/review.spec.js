const request = require('../mock/request');
const mongoose = require("mongoose");

let token = "";
let user_id= "646f19c87a260efc2e47be70";
let accommodation_id= "646f1ebf7a260efc2e47be8c";
//let review_id='646f34a83bee8437124cafef';
let review_id=''
// let new_report_id = "";

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});



describe('review.spec.js', () => {

    it('Login 200 - Login SUCCESS', async () => {
        const response = await request.post('/api/sign-in').send({
            username: "av1234",
            password: "1aA@12345",
        })

        token = response.body.data;

        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": token });
    })

    // Create Review
    
    it('Create Review 201 - Create review SUCCESS', async () => {
        // do work
        const response = await request.post('/api/review').send({
            rating:3,
            comment: "hahahah panget",
            user_id: user_id,
            accommodation_id: accommodation_id,
        }).set('Authorization', `Bearer ${token}`);
    
        review_id= response.body.data._id;
    
        // assert
        expect(response.statusCode).toBe(201)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
    })

    it('Create Review 400 - Create review Fail - Accommodation does not exist', async () => {
        // do work
        const response = await request.post('/api/review').send({
            rating:3,
            comment: "hahahah panget",
            user_id: user_id,
            accommodation_id: 'aff3aAA98BD48CE5d6e3aA4D',
        }).set('Authorization', `Bearer ${token}`);
    
        
    
        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: accommodation_id: The accommodation the user is reviewing does not exist"] })
    })

    it('Create Review 400 - Create review Fail - User does not exist', async () => {
        // do work
        const response = await request.post('/api/review').send({
            rating:3,
            comment: "hahahah panget",
            user_id: 'Ad6eE090CCb140bECbBFAF1f',
            accommodation_id: accommodation_id,
        }).set('Authorization', `Bearer ${token}`);
    
        
    
        // assert
        expect(response.statusCode).toBe(400)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["ValidationError: user_id: The user reviewing the accommodation does not exist"] })
    })

    //get all reviews
    it('Get All Reviews 200 - Get all reviews SUCCESS', async () => {
        // do work
        const response = await request.get('/api/review').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": response.body.data }) 
    })

    //get review by id

    it('Get Review by id 201 - Get review Success', async () => {
        // do work
        const response = await request.get('/api/review/'+review_id).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success" : true, "data":response.body.data})
    })



    it('Get Review by id 404 - Get review FAIL - review id does not exist', async () => {
        // do work
        const response = await request.get('/api/review/6465ef7e5aec5a13ef4b82bd').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(404)
        expect(response.body).toStrictEqual({ "success" : false, "messages": ["Error: Not found"]})
    })
//edit review
it('Edit Review 200 - Edit Review SUCCESS', async () => {
    // do work
    const response = await request.put('/api/review/'+review_id).send({
        rating:3,
        comment: "hahahah ganda",
        user_id: user_id,
        accommodation_id: accommodation_id,
    }).set('Authorization', `Bearer ${token}`);
    


    // assert
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({ "success": true, "data": response.body.data })
})

it('Edit Review 400 - Edit Review Fail - Accommodation does not exist', async () => {
    // do work
    const response = await request.post('/api/review/'+review_id).send({
        rating:3,
        comment: "hahahah panget",
        user_id: user_id,
        accommodation_id: 'aff3aAA98BD48CE5d6e3aA4D',
    }).set('Authorization', `Bearer ${token}`);

    

    
    // assert
    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({})
})

it('Edit Review 404 - Edit Review Fail - User id does not exist', async () => {
    // do work
    const response = await request.post('/api/review/'+review_id).send({
        rating:3,
        comment: "hahahah panget",
        user_id: '646f19c87a260efc2e47be7d',
        accommodation_id: accommodation_id,
    }).set('Authorization', `Bearer ${token}`);

    

    // assert
    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({ })
})





    //delete review by id

    it('Delete Review 200 - Delete review SUCCESS', async () => {
        // do work
        const response = await request.delete('/api/review/' + review_id).set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ "success": true, "data": null })
    })

    it('Delete Review 404 - Delete review Fail - Review Id does not exist', async () => {
        // do work
        const response = await request.delete('/api/review/646f26e4e03d256afc1563ad').set('Authorization', `Bearer ${token}`);

        // assert
        expect(response.statusCode).toBe(404)
        expect(response.body).toStrictEqual({ "success": false, "messages": ["Error: Not found"] })
    })


    

        



})