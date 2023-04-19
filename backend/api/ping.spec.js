const request = require('../mock/request')

describe('ping.spec.js', () => {
  it('should ping successfully', async () => {
    // do work
    const response = await request.get('/api/ping')

    // assert
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('Hello World!')
  })
})
