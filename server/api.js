const express = require('express');
const api = express.Router();
const db = require('./db.js');
const validator = require("email-validator");
const passwordHash = require('password-hash');
const cryptoRandomString = require('crypto-random-string');
const sendmail = require('sendmail')();
const urlSlug = require('url-slug');

// TODO
function get_current_id() {
	return 1;
}

function get_current_username() {
	return 'MrRaiN';
}

//articles
api.get('/user/:id/articles/:offset/:limit', (req, res) => {
    let offset = (req.params.offset !== undefined) ? parseInt(req.params.offset) : 0;
    let limit = (req.params.limit !== undefined) ? parseInt(req.params.limit) : 25;
    db.query("SELECT id,title,content,creation_date,views,likes,dislikes FROM articles WHERE author=? LIMIT ?,?", [parseInt(req.params.id),limit,offset], (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
});

//registration
api.post('/registration', (req, res) => {
    if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined || req.body.cpassword === undefined || req.body.title === undefined)
        res.json({ code: 1, message: "Too few parameters" });
    else if (req.body.username.length < 3) res.json({ code: 2, message: "Username is too short" });
    else if (req.body.username.length > 80) res.json({ code: 3, message: "Username is too long" });
    else if (req.body.password.length < 6) res.json({ code: 6, message: "Password is too short (min: 6)" });
    else if (req.body.password !== req.body.cpassword) res.json({ code: 7, message: "Passwords are different" });
    else if (!validator.validate(req.body.email)) res.json({ code: 8, message: "Wrong email adress" });
    else if (!req.body.checkbox) res.json({ code: 9, message: "Checkbox unchecked" });
    else {
        db.query("SELECT count(1) AS result FROM users WHERE username=? LIMIT 1", [req.body.username], (err, result, fields) => {
            if (err) throw err;
            if (result[0].result > 0) res.json({ code: 4, message: "Username is used" });
            else {
                db.query("SELECT count(1) AS result FROM users WHERE email=? LIMIT 1", [req.body.email], (err, result, fields) => {
                    if (err) throw err;
                    if (result[0].result > 0) res.json({ code: 5, message: "Email is used" });
                    else {
                        const hash = passwordHash.generate(req.body.password);
                        const token = cryptoRandomString({ length: 32, type: 'hex' });
                        db.query("INSERT INTO users (email, username, password, title, registration_token) VALUES (?, ?, ?, ?, ?)", [req.body.email, req.body.username, hash, req.body.title, token], (err, result, fields) => {
                            if (err) throw err;
                            res.json({ code: 0, message: "success" });
                            sendmail({
                                from: 'no-reply@ublog.ue',
                                to: req.body.email,
                                subject: 'µBlog - confirm registration email',
                                html: 'Please click the link to activate your account<br/><a href="https://ublog.eu/registration-confirm?token=' + token + '">https://ublog.eu/registration-confirm?token=' + token + '</a><br/>Check your spam folder<br/>µBlog',
                            }, function(err, reply) {
                                console.log(err && err.stack);
                                console.dir(reply);
                            });
                        });
                    }
                });
            }
        });
    }
});

// registration-confirm test
api.post('/registration/token', (req, res) => {
    db.query("SELECT count(1) AS result FROM users WHERE registration_token=? LIMIT 1", [req.body.token], (err, result, fields) => {
        if (err) throw err;
        if (result[0].result === 0) res.json({ code: 1, message: "Token is incorrect" });
        else {
            db.query("UPDATE users SET registration_token=null WHERE registration_token=?", [req.body.token], (err, result, fields) => {
                if (err) throw err;
                res.json({ code: 0, message: "success" });
            });
        }
    });
});

// create an article
api.post('/article', (req, res) => {
	if (req.body.title === undefined || req.body.title === '') res.json({ code: 1, message: 'Title is not set' });
	else if (req.body.content === undefined || req.body.content === '') res.json({ code: 2, message: 'Content is not set' });
	else {
		const id = get_current_id();
		db.query("INSERT INTO articles (author, title, content) VALUES (?, ?, ?)", [id, req.body.title, req.body.content], (err, result, fields) => {
			if (err) throw err;
			db.query("SELECT id FROM articles WHERE author=? AND title=? ORDER BY creation_date DESC LIMIT 1", [id, req.body.title], (err, result, fields) => {
				if (err) throw err;
				const url = '/' + get_current_username() + '/' + result[0].id + '/' + urlSlug(req.body.title);
				res.json({ code: 0, message: "success", id: result[0].id, url: url });
			});
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