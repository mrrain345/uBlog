<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light">
			<div class="container">
				<a class="navbar-brand" href="#">µBlog</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav">
						<router-link class="nav-item nav-link active" to="/writer">MarkdownWriter</router-link>
						<router-link class="nav-item nav-link" to="/rest">RestTest</router-link>
					</div>
				</div>
			</div>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style scoped>
	nav {
		background-color: #388e3c;
		margin-bottom: 15px;
		box-shadow: #1b5e20 0 2px 6px 0px;
	}
</style>
