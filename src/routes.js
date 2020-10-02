const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.send('Hello World');
});

routes.get('/users', (request, response) => {
    console.log(request.query);
    return response.send({
        Nome: 'Júlia Fritegotto'
    });
});

routes.post('/users', (request, response) => {
    console.log(request.body);
     return response.send({
        Nome: 'Júlia Fritegotto'
    });
    
});

module.exports = routes;