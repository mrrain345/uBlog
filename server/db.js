const mysql = require('mysql');

const sql = mysql.createConnection({
	host: 'shell.visiongames.eu',
	user: 'ublog',
	password: 'gzrbyLGj3y6Q5o13',
	database: 'ublog'
});

module.exports = {
	sql: sql,
	query: (query, callback) => {
		sql.query(query, (err, result, fields) => {
			if (err) throw err;
			callback(result, fields);
		});
	}
};