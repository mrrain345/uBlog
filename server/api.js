const express = require('express');
const api = express.Router();

api.get('/test', (req, res) => res.json({
	test: "API TEST",
	test2: "API TEST 2"
}));

api.put('/test', (req, res) => {
	console.log('PUT:', req.body);
});

api.post('/cookies', (req, res) => {
	console.log('Cookies:', req.cookies);
	console.log('Signed Cookies:', req.signedCookies);
});

api.get('/cookies', (req, res) => {
	const options = {
		maxAge: 1000 * 60 * 60 * 14,
		httpOnly: true,
		signed: true
	}
	res.cookie('ublog_session', Math.floor(Math.random()*10000000000), options);
	res.json({});
});

module.exports = api;