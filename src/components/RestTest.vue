<template>
	<div v-if="test !== null">
		<p>{{ test.test }}</p>
		<p>{{ test.test2 }}</p>
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
		rest.get('/test', (err, data) => {
			if (err) throw err;
			this.test = data;
			console.log(data);
		});
	}
}
</script>
