module.exports = {
	chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8081'
			}
		}
	}
}