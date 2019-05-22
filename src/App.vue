<template>
	<div class="container">
		<MarkdownWriter/>
		<RestTest/>
	</div>
</template>

<script>
import MarkdownWriter from './components/MarkdownWriter.vue'
import RestTest from './components/RestTest.vue'

export default {
	name: 'app',
	components: {
		MarkdownWriter,
		RestTest
	}
}
</script>