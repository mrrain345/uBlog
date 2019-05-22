const mysql = require('mysql');

module.exports = mysql.createConnection({
	host: 'shell.visiongames.eu',
	user: 'ublog',
	password: 'gzrbyLGj3y6Q5o13',
	database: 'ublog'
});