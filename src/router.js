module.exports = {
    routes: [
        { path: '/', component: require('./components/Main.vue').default },
        { path: '/writer', component: require('./components/MarkdownWriter.vue').default },
        { path: '/add-comment', component: require('./components/AddComment.vue').default },
        { path: '/comment', component: require('./components/Comment.vue').default },
        { path: '/registration', component: require('./components/RegistrationForm.vue').default },
        { path: '/registration-confirm', component: require('./components/RegistrationConfirm.vue').default },
        { path: '/login', component: require('./components/Login.vue').default },
        { path: '/articles', component: require('./components/Articles.vue').default },
        { path: '*', component: require('./components/NotFound.vue').default }

    ]
};