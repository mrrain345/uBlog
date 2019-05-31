<template>
	<div>
		<Navbar/>
		<router-view></router-view>
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
	name: 'app',
	components: {
		Navbar
	}
}
</script>

<style scoped>
	nav {
		background-color: #388e3c;
		margin-bottom: 15px;
		box-shadow: #1b5e20 0 2px 6px 0px;
	}
</style>
