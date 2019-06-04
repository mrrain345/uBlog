const express = require('express');
const server = express();
const api = require('./api.js');
const cookieParser = require('cookie-parser');

// Server setup
server.use(express.json());
server.use(cookieParser('as7aVtnSDxa20LfOXDBzdEII4cSVezdp'));
server.use('/api', api);

// Serve index.html
server.get('*', (req, res) => res.sendFile('index.html', {
	root: 'public'
}));

// Run server
server.listen(8081, () => console.log('Server listening on port 8081'));