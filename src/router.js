module.exports = {
	routes: [
		{ path: '/writer', component: require('./components/MarkdownWriter.vue').default },
		{ path: '/rest', component: require('./components/RestTest.vue').default },
		{ path: '/add-comment', component: require('./components/AddComment.vue').default},
		{ path: '/comment', component: require('./components/Comment.vue').default},
		{ path: '/registration', component: require('./components/RegistrationForm.vue').default}
	]
};