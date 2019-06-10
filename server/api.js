const express = require('express');
const api = express.Router();
const db = require('./db.js');
const validator = require("email-validator");
const passwordHash = require('password-hash');
const cryptoRandomString = require('crypto-random-string');
const sendmail = require('sendmail')();
const urlSlug = require('url-slug');

function throw_error(req, err) {
	if (err) {
		console.error('ERROR:', err);
		console.error('REQUEST:', req.method, req.url, JSON.stringify(req.body, null, 2));
	}
}

function get_current_user(req, callback) {
	const session = req.signedCookies['ublog_session'];
	if (session === undefined) callback (undefined);
    else{
        db.query("SELECT sessions.user AS id, users.username AS username FROM sessions LEFT JOIN users ON sessions.user=users.id WHERE session=? LIMIT 1", [session], (err, result, fields) => {
            throw_error(req, err);
            if (result.length < 1) callback(undefined);
            else callback({ id: result[0].id, username: result[0].username });
        });
    }
}


// create session
api.post('/session', (req, res) => {
	if (req.body.email === null || req.body.password === null) res.json({ code: 2, message: "Email and password is required" });
	else {
		db.query("SELECT id, password FROM users WHERE email=?LIMIT 1", [req.body.email], (err, result, fields) => {
			throw_error(req, err);
			if (result.length < 1) res.json({ code: 1, message: "Bad email or password" });
			else if (!passwordHash.verify(req.body.password, result[0].password)) res.json({ code: 1, message: "Bad email or password" });
			else {
				const session = cryptoRandomString({ length: 32, type: 'hex' });
				const options = {
					maxAge: 1000 * 60 * 60 * 30,
					httpOnly: true,
					signed: true
				};

				db.query("INSERT INTO sessions (session,user) VALUES (?, ?)", [session, result[0].id], (err, result2, fields) => {
					throw_error(req, err);
					res.cookie('ublog_session', session, options);
					res.json({ code: 0, message: "success", id: result[0].id, username: result[0].username });
				});
			}
		});
	}
});

// check session
api.get('/session', (req, res) => {
	get_current_user(req, (user) => {
		console.log('user:', user);
		if (user === undefined) res.json({ code: 1, message: 'Session not found' });
		else {
			console.log({ code: 0, message: 'You are logged in', id: user.id, username: user.username });
			res.json({ code: 0, message: 'You are logged in', id: user.id, username: user.username });
		}
	});
});

//articles
api.get('/user/:id/articles/:offset?/:limit?', (req, res) => {
    let offset = (req.params.offset !== undefined) ? parseInt(req.params.offset) : 0;
	let limit = (req.params.limit !== undefined) ? parseInt(req.params.limit) : 25;
    db.query("SELECT id,title,content,creation_date,views,likes,dislikes FROM articles WHERE author=? LIMIT ?,?", [parseInt(req.params.id),offset,limit], (err, result, fields) => {
        throw_error(req, err);
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
            throw_error(req, err);
            if (result[0].result > 0) res.json({ code: 4, message: "Username is used" });
            else {
                db.query("SELECT count(1) AS result FROM users WHERE email=? LIMIT 1", [req.body.email], (err, result, fields) => {
                    throw_error(req, err);
                    if (result[0].result > 0) res.json({ code: 5, message: "Email is used" });
                    else {
                        const hash = passwordHash.generate(req.body.password);
                        const token = cryptoRandomString({ length: 32, type: 'hex' });
                        db.query("INSERT INTO users (email, username, password, title, registration_token) VALUES (?, ?, ?, ?, ?)", [req.body.email, req.body.username, hash, req.body.title, token], (err, result, fields) => {
                            throw_error(req, err);
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
        throw_error(req, err);
        if (result[0].result === 0) res.json({ code: 1, message: "Token is incorrect" });
        else {
            db.query("UPDATE users SET registration_token=null WHERE registration_token=?", [req.body.token], (err, result, fields) => {
                throw_error(req, err);
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
		get_current_user(req, (user) => {
			if (user === undefined) res.json({ code: 3, message: 'You are not logged' });
			else {
				db.query("INSERT INTO articles (author, title, content) VALUES (?, ?, ?)", [id, req.body.title, req.body.content], (err, result, fields) => {
					throw_error(req, err);
					db.query("SELECT id FROM articles WHERE author=? AND title=? ORDER BY creation_date DESC LIMIT 1", [user.id, req.body.title], (err, result, fields) => {
						throw_error(req, err);
						const url = '/' + user.username + '/' + result[0].id + '/' + urlSlug(req.body.title);
						res.json({ code: 0, message: "success", id: result[0].id, url: url });
					});
				});
			}
		});
	}
});

//Add comment
api.post('/article/:id/comments', (req, res) => {
    get_current_user(req, (user)=> {
        if(!user){ res.json({ code: 1, message: "You are not logged in"});}
        else {
            db.query("INSERT INTO comments (article, author, content) VALUES (?, ?, ?)", [req.params.id, user.id, req.body.content], (err, result, fields)=> {
                throw_error(req, err);
                res.json({ code: 0, message: "success"});
            })
        }
    })
});

//Get comments
api.get('/article/:id/comments', (req, res) => {
    db.query("SELECT id, author, users.username, content, creation_date, likes, dislikes FROM comments LEFT JOIN users ON users.id=author WHERE article=?", [req.params.id], (err, result, fields)=> {
        throw_error(req, err);
        res.json({ code: 0, message: "success", comments: result});
    })
});

//Get reaction
api.get('/article/:id/comments/reaction', (req, res) => {
    get_current_user(req, (user)=> {
        if(!user) res.json({ code: 0, message: "success", reaction: 0});
        else {
            db.query("SELECT reaction FROM comment_reactions WHERE article=? AND user=? LIMIT 1", [req.params.id, user.id], (err, result, fields)=> {
                throw_error(req, err);
                let reaction = 0;
                if (result.length===0) reaction=0;
                else if (result[0].reaction==='LIKE') reaction=1;
                else if (result[0].reaction==='DISLIKE') reaction=2;
                res.json({ code:0, message: "success", reaction: reaction});
            })
        }
    })
});

//Update reaction
api.put('/article/:id/comments/:comment/reaction', (req, res) => {
    if(req.body.reaction===undefined) res.json({ code: 2, message: "Reaction is required"})
    else if(req.body.reaction<0 || req.body.reaction>2) res.json({ code: 3, message: "Incorrect reaction"})
    else {
        get_current_user(req, (user)=> {
            if(!user) res.json({ code: 1, message: "You are not logged in"});
            else {
                db.query("SELECT reaction FROM comment_reactions WHERE article=? AND user=? LIMIT 1", [req.params.id, user.id], (err, result, fields)=> {
                    throw_error(req, err);
                    if (result.length===0 && req.body.reaction!==0) {
                        db.query("INSERT INTO comment_reactions (user, article, target, reaction) VALUES (?, ?, ?, ?)", [user.id, req.params.id, req.params.comments, (req.body.reaction===1)? 'LIKE' : 'DISLIKE'], (err, result, fields)=> {
                            throw_error(req, err);
                            res.json({ code: 0, message: "success", reaction: req.body.reaction})
                        });
                    }
                    else if (result.length!==0 && req.body.reaction!==0) {
                        db.query("UPDATE comment_reactions SET reaction=? WHERE user=? AND article=? AND target=? LIMIT 1", [ (req.body.reaction===1)? 'LIKE' : 'DISLIKE', user.id, req.params.id, req.params.comments], (err, result, fields)=> {
                            throw_error(req, err);
                            res.json({ code: 0, message: "success", reaction: req.body.reaction})
                        });
                    }
                    else if (result.length!==0 && req.body.reaction===0) {
                        db.query("DELETE FROM comment_reactions WHERE user=? AND article=? AND target=? LIMIT 1", [ user.id, req.params.id, req.params.comments], (err, result, fields)=> {
                            throw_error(req, err);
                            res.json({ code: 0, message: "success", reaction: req.body.reaction})
                        });
                    }
                    else {
                        res.json({ code: 0, message: "success", reaction: req.body.reaction})
                    }
                })
            }
        })
    }
});
//Header check subscribe
api.get('/article/:id/subscribe', (req, res) => {
    
    get_current_user(req, (user)=>{
        
        if(user===undefined){
            res.json({ code: 0, message: "success", subscribed:false});
        }
        else{
            db.query("SELECT subscribed FROM subscriptions WHERE user = ? AND subscribed = ? LIMIT 1", [user.id,req.params.id], (err, result, fields)=> {
                throw_error(req, err);
                if(result.length===0){
                    res.json({ code: 0, message: "success", subscribed:false});
                }    
                else{
                    res.json({ code: 0, message: "success", subscribed:true});
                }
             })
        }
    });
});

//Header change subcription
api.put('/article/:id/subscribe', (req, res) => {
    if(req.body.subscribe===undefined){
        res.json({ code: 2, message: "Subscribe is required"});
    }
    else get_current_user(req, (user)=>{
       
        if(user===undefined){
            res.json({ code: 1, message: "You're not logged in"});
        }
        else{
            db.query("SELECT subscribed FROM subscriptions WHERE user = ? AND subscribed = ? LIMIT 1", [user.id,req.params.id], (err, result, fields)=> {
                throw_error(req, err);
                if(result.length===0 && req.body.subscribe) {
                    db.query("INSERT INTO subscribed (user, subscribed) VALUES (?,?)", [user.id,req.params.id], (err, result, fields)=> {
                        throw_error(req, err);
                        db.query("UPDATE users SET subscribes=subscribes+1 WHERE id=?",[req.params.id],(err, result, fields)=>{
                            throw_error(req, err);
                            res.json({ code: 0, message: "success", subscribed:true});
                        })
                    })
                }    
                else if(result.length!==0 && !req.body.subscribe){
                    db.query("DELETE FROM subscribed WHERE user = ? AND subscribed = ? LIMIT 1", [user.id,req.params.id], (err, result, fields)=> {
                        throw_error(req, err);
                        db.query("UPDATE users SET subscribes=subscribes-1 WHERE id=?",[req.params.id],(err, result, fields)=>{
                            throw_error(req, err);
                            res.json({ code: 0, message: "success", subscribed:false});
                        })
                        
                        
                    })
                }
                else{
                    res.json({ code: 0, message: "success", subscribed:req.body.subscribe});
                }
             })
        }
    });
});



// 404 handler
api.all('*', (req, res) => res.json({
    error: 404,
    message: 'Not Found'
}));

module.exports = api;