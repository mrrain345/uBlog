<template>
	<div class="container">
		<div id="toolbar" class="row">
			<div class="dropdown">
				Header
			</div>
			<div id="b" class="button" @click="insert('**')"><b>B</b></div>
			<div id="i" class="button" @click="insert('*')"><i>I</i></div>
			<div id="u" class="button" @click="insert('++')"><u>U</u></div>
		</div>
		<div class="row">
			<textarea id="source" class="col-6" v-model="source"></textarea>
			<VueMarkdown class="markdown col-6" :source="source"></VueMarkdown>
		</div>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
	name: 'MarkdownWriter',
	components: {
		VueMarkdown
	},
	data() {
		return {
			source: '# Markdown\n\nLorem ipsum'
		};
	},
	methods: {
		insert(str) {
			const textarea = document.getElementById('source');
			textarea.focus();
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const txt1 = textarea.value.substr(0, start);
			const txt2 = textarea.value.substr(start, end-start);
			const txt3 = textarea.value.substr(end);

			textarea.value = txt1 + str + txt2 + str + txt3;
			textarea.selectionStart = start + str.length;
			textarea.selectionEnd = end + str.length;
			this.source = textarea.value;
		}
	}
}
</script>

<style scoped>
	#toolbar {
		height: 48px;
		background-color: #4caf50;
		margin-bottom: 10px;
	}

	.dropdown {
		float: left;
		width: 96px;
		height: 32px;
		margin: 8px;
		margin-right: 0;
		text-align: center;
		font-size: 18px;
		line-height: 1.8;
		font-weight: bold;
		background-color: #81c784;
		color: #c8e6c9;
		transition: all 0.3s;
	}

	.button {
		float: left;
		width: 32px;
		height: 32px;
		margin: 8px;
		margin-right: 0;
		text-align: center;
		font-size: 24px;
		background-color: #81c784;
		color: #c8e6c9;
		transition: all 0.3s;
	}

	.dropdown:hover, .button:hover {
		background-color: #66bb6a;
	}

	.dropdown:active, .button:active {
		background-color: #43a047;
	}

	textarea {
		height: 600px;
		outline: none;
		resize: none;
		border: none;
		border-right: dotted 1px #81c784;
		border-left: dotted 1px #81c784;
	}

	.markdown {
		border-right: dotted 1px #81c784;
	}
</style>
