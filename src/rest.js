const rest = {
	url: 'http://localhost:8080/api',

	get(uri, callback) {
		fetch(rest.url + uri)
		.then((res) => res.json())
		.then((data) => callback(null, data))
		.catch((err) => callback(err, null));
	}
}

export default rest;