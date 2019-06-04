const express = require('express');
const api = express.Router();
const db = require('./db.js');
const validator = require("email-validator");
const passwordHash = require('password-hash');
const cryptoRandomString = require('crypto-random-string');

// mysql test
api.get('/test', (req, res) => {
    db.query("SELECT ? AS result", [1], (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
});

//registration
api.post('/user', (req, res) => {

    //TODO: check if fields are definied

    if (req.body.username.length < 3) res.status(400).json({ code: 1, message: "Username is too short" });
    else if (req.body.username.length > 80) res.status(400).json({ code: 2, message: "Username is too long" });
    else if (req.body.password.length < 6) res.status(400).json({ code: 4, message: "Password is too short (min: 6)" });
    else if (req.body.password !== req.body.cpassword) res.status(400).json({ code: 5, message: "Passwords are different" });
    else if (!validator.validate(req.body.email)) res.status(400).json({ code: 6, message: "Wrong email adress" });
    else {
        db.query("SELECT count(1) AS result FROM users WHERE username='?' LIMIT 1", [req.body.username], (err, result, fields) => {
            if (err) throw err;
            if (result.result > 0) res.status(400).json({ code: 7, message: "Username is used" });
            else {
                db.query("SELECT count(1) AS result FROM users WHERE email='?' LIMIT 1", [req.body.email], (err, result, fields) => {
                    if (err) throw err;
                    if (result.result > 0) res.status(400).json({ code: 3, message: "Email is used" });
                    else {
                        const hash = passwordHash.generate(req.body.password);
                        const token = cryptoRandomString({ length: 32, type: 'hex' });
                        db.query("INSERT INTO users (email, username, password, title, registration_token) VALUES ('?', '?', '?', '?', '?')", [req.body.email, req.body.username, hash, req.body.title, token], (err, result, fields) => {
                            if (err) throw err;
                            res.json({ message: "success" });
                        });
                    }
                });
            }
        });
    }
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
    res.cookie('ublog_session', Math.floor(Math.random() * 10000000000), options);
    res.json({});
});
// 404 handler
api.all('*', (req, res) => res.json({
    error: 404,
    message: 'Not Found'
}));

module.exports = api;