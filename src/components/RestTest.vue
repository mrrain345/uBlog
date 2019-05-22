<template>
	<div v-if="test !== null">
		<p>REST: {{ JSON.stringify(test) }}</p>
	</div>
</template>

<script>
import rest from '../rest.js'

export default {
	name: "RestTest",
	data() {
		return {
			test: null
		};
	},
	created() {
		rest.get('/test', null, (err, data) => {
			if (err) throw err;

			this.test = data;
			console.log("OK");
			console.log(data);
		});

		/*rest.get('/cookies', null, (err, data) => {
			if (err) throw err;
		});

		rest.post('/cookies', null, (err, data) => {
			if (err) throw err;
		});*/
	}
}
</script>
