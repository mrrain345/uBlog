const express = require('express');
const api = express.Router();
const db = require('./db.js');

// mysql test
api.get('/test', (req, res) => {
	db.query("SELECT ? AS result", [1], (err, result, fields) => {
		if (err) throw err;
		res.json(result);
	});
});



// cookies test
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

// 404 handler
api.all('*', (req, res) => res.json({
	error: 404,
	message: 'Not Found'
}));

module.exports = api;