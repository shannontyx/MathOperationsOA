const server = require('./server'); // import server instance
const supertest = require('supertest');
let requestWithSupertest;

beforeAll(() => {
    requestWithSupertest = supertest(server);
});

afterAll((done) => {
    server.close(done);
});

test('Add two numbers', async () => {
    const response = await requestWithSupertest
        .post('/api/add')
        .send({ num1: 10, num2: 2 })
    expect(response.body.result).toBe(12);
})

test('Subtract two numbers', async () => {
    const response = await requestWithSupertest
        .post('/api/subtract')
        .send({ num1: 10, num2: 2 })
    expect(response.body.result).toBe(8);
})