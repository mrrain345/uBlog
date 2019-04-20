const express = require('express');
const server = express();
const api = require('./api.js');
const cookieParser = require('cookie-parser');

server.use(express.json());
server.use(cookieParser('as7aVtnSDxa20LfOXDBzdEII4cSVezdp'));
server.use('/api', api);

server.get('*', (req, res) => res.status(404).json({
	error: 404,
	message: 'Not Found'
}));

server.listen(8081, () => console.log('Server listening on port 8081'));