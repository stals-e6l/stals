const request = require('../mock/request')

describe('ping.spec.js', () => {
  it('should ping successfully', async () => {
    // do work
    const response = await request.get('/api/ping')

    // assert
    expect(response.statusCode).toBe(401)
    expect(response.body).toStrictEqual({ "success": false, "messages": [ 'Error: Your request needs to be authenticated' ] })
  })
})
