const express = require('express');
const api = express.Router();

api.get('/test', (req, res) => res.json({
	test: "API TEST",
	test2: "API TEST 2"
}));

module.exports = api;