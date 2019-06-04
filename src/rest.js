class RestError extends Error {
	constructor(res, ...params) {
		super(res.status + ' ' + res.statusText + ' (' + res.url + ')', ...params);
		if (Error.captureStackTrace) Error.captureStackTrace(this, RestError);

		this.status = res.status;
		this.statusText = res.statusText;
	}
}

const rest = {
	url: '/api',

	request(method, uri, data, callback) {
		fetch(rest.url + uri, {
			method: method,
			body: (data === null) ? undefined : JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (!res.ok) throw new RestError(res);
			res.json().then(res => callback(null, res))
		})
		.catch(err => callback(err, null));
	},

	get		(uri, data, callback) { rest.request('GET', uri, data, callback); },
	put		(uri, data, callback) { rest.request('PUT', uri, data, callback); },
	post	(uri, data, callback) { rest.request('POST', uri, data, callback); },
	delete	(uri, data, callback) { rest.request('DELETE', uri, data, callback); }
}

export default rest;