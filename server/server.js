const express = require('express');
const server = express();
const api = require('./api.js');

server.use('/api', api);
server.listen(8081, () => console.log('Server listening on port 8081'));