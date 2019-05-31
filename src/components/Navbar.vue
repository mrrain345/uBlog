<template>
	<nav class="navbar navbar-expand-lg navbar-light">
		<div class="container">
			<router-link class="navbar-brand" to="/">
				<span @click="setActive(-1)">µBlog</span>
			</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav" :key=id v-for="(nav, id) in navs">
					<router-link class="nav-item nav-link" :class="{ 'active': active === id }" :to="nav.href">
						<span @click="setActive(id)">{{ nav.text }}</span>
					</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {
			active: -1,
			navs: [
				{ href: '/writer', text: 'Markdown' },
				{ href: '/comment', text: 'Comment' },
				{ href: '/add-comment', text: 'AddComment' },
				{ href: '/registration', text: 'Registration' },
				
			]
		}
	},
	methods: {
		setActive(id) {
			this.active = id;
		}
	},
	beforeMount() {
		const path = window.location.pathname;
		this.active = -1;
		for (let i = 0; i < this.navs.length; i++) {
			if (this.navs[i].href === path) {
				this.active = i;
				break;
			}
		}
	}
}
</script>

<style scoped>

</style>
