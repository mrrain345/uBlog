module.exports = {
	routes: [
		{ path: '/writer', component: require('./components/MarkdownWriter.vue').default },
		{ path: '/rest', component: require('./components/RestTest.vue').default },
		{ path: '/comment', component: require('./components/AddComment.vue').default}
	]
};