<template>
	<div class="container">
		<MarkdownWriter/>
	</div>
</template>

<script>
import MarkdownWriter from './components/MarkdownWriter.vue'

export default {
	name: 'app',
	components: {
		MarkdownWriter
	}
}
</script>