const axios = require('axios');

const baseUrl = 'http://localhost:3050/api';

describe('API tests', () => {
    test('GET /', async () => {
        const response = await axios.get(`${baseUrl}/`);
        expect(response.status).toBe(200);
        expect(response.data).toBe('expected response from GET /');
    });

    test('POST /', async () => {
        const tool = {
            tool_id: 1,
            toolName: 'Example Tool',
            contentTypeId: 222222,
            ecosystem: 'Example Ecosystem',
            freeVersion: true,
            licenseType: 'Open Source',
            paidVersion: false,
            referenceURL: 'http://example.com',
            toolDescription: 'Example Description'
        };
        const response = await axios.post(`${baseUrl}/`, tool);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('tool_id');
    });

    test('POST /', async ()=>{
        const tool = {
            tool_id: 1,
            toolName: 'Example Tool',
            contentTypeId: 2,
            ecosystem: 'Example Ecosystem',
            freeVersion: true,
            licenseType: 'Open Source',
            paidVersion: false,
            referenceURL: 'http://example.com',
            toolDescription: 'Example Description'
        };
        const response = await axios.post(`${baseUrl}/`, tool);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('tool_id');
    }); 

    test('GET /by-content-type/:contentTypeName', async () => {
        const contentTypeName = 'Software';
        const response = await axios.get(`${baseUrl}/by-content-type/${contentTypeName}`);
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        
    });

    test('DELETE /:tool_id', async () => {
        const tool_id = 'c000001'; // assuming this tool exists for testing
        const response = await axios.delete(`${baseUrl}/${tool_id}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('tool_id');
        // Further assertions can check the specifics of the deleted data
    });

    test('POST /login/', async () => {
        const userCredentials = {
            email: 'test@example.com',
            password: 'testPassword123'
        };
        const response = await axios.post(`${baseUrl}/login/`, userCredentials);
        expect(response.status).toBe(201);
        // Check for specific properties in the response, depending on what your API sends back
        expect(response.data).toHaveProperty('token'); 
    });
    test('POST /login/', async () => {
        const userCredentials = {
            email: 'sadrac.aramburo@gmail.com',
            password: '12345678910'
        };
        const response = await axios.post(`${baseUrl}/login/`, userCredentials);
        expect(response.status).toBe(200);
        // Check for specific properties in the response, depending on what your API sends back
        expect(response.data).toHaveProperty('token');
    });


});

