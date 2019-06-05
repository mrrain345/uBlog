<template>
	<div class="container">
		<div id="toolbar" class="row">
			<div class="btn-group" style="margin-right: 5px;">
				<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Header</button>
				<div class="dropdown-menu">
					<button class="dropdown-item" @click="set_header(1)">Title</button>
					<button class="dropdown-item" @click="set_header(3)">Subtitle</button>
					<button class="dropdown-item" @click="set_header(0)">Normal text</button>
					<div class="dropdown-divider"></div>
				</div>
			</div>
			<div class="btn-group" role="group" aria-label="Basic example">
				<button type="button" class="btn btn-success" @click="insert('**')">B</button>
				<button type="button" class="btn btn-success" @click="insert('*')">I</button>
				<button type="button" class="btn btn-success" @click="insert('++')">U</button>
			</div>
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
			source: '# Lorem ipsum\n\n### Lorem ipsum dolor sit amet\nConsectetur adipiscing elit. Curabitur ac ante pretium tortor venenatis fringilla. Quisque mauris augue, sollicitudin quis congue quis, facilisis at nibh. Sed euismod consectetur magna ac malesuada. Morbi erat leo, pulvinar id euismod quis, imperdiet vel nunc. Nulla lacinia malesuada purus, eu maximus leo semper et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum enim sed vestibulum maximus. Praesent imperdiet in dui ut ultrices. In sit amet aliquet nibh, eu pretium tellus.\n\nSuspendisse rutrum, dolor ultricies luctus tempus, orci diam scelerisque massa, vel posuere neque metus ac nisi. Sed efficitur ut est ac scelerisque. Pellentesque porttitor, ipsum quis semper porta, massa lectus consequat neque, non lobortis ex metus ut diam. Fusce consequat dui sit amet eros ultricies egestas. Praesent quis rhoncus mi, ac tincidunt enim. Sed aliquam luctus urna, et tempor turpis molestie ac. Nunc nec venenatis enim. Nullam elementum metus eu vulputate hendrerit. Pellentesque interdum euismod consequat. Suspendisse consectetur mattis porta. Aenean massa eros, dignissim vitae maximus vel, fringilla a ligula. Morbi felis nibh, viverra maximus nisl vitae, hendrerit bibendum diam. Sed a nibh quam. Nulla commodo tincidunt ultrices. Mauris aliquam orci risus, nec aliquet lacus laoreet eu. Suspendisse pulvinar vehicula lorem tristique fringilla.'
		};
	},
	methods: {
		set_text(str, selection_start, selection_end) {
			const textarea = document.getElementById('source');
			textarea.focus();
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;

			textarea.value = str;
			textarea.selectionStart = start + selection_start;
			textarea.selectionEnd = end + selection_end;
			this.source = textarea.value;
		},

		insert(str) {
			const textarea = document.getElementById('source');
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const value = textarea.value;

			const txt1 = value.substr(0, start-str.length);
			const txt2 = value.substr(start-str.length, str.length);
			const txt3 = value.substr(start, end-start);
			const txt4 = value.substr(end, str.length);
			const txt5 = value.substr(end+str.length);

			const text = txt1 + (txt2 === str ? '' : txt2 + str) + txt3 + (txt4 === str ? '' :  str + txt4) + txt5;
			this.set_text(text, (str === txt2 ? -str.length : str.length), (str === txt4 ? -str.length : str.length));
		},

		set_header(lvl) {
			const textarea = document.getElementById('source');
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const value = textarea.value
			const line_start = value.substr(0, start).lastIndexOf('\n')+1;
			const value2 = value.substr(line_start);

			let hlvl = 0;
			for (let i = 0; i < 7; i++) {
				if (value2.charAt(i) === '#') hlvl++;
				else if (value2.charAt(i) === ' ') {
					hlvl++;
					break;
				} else {
					hlvl = 0;
					break;
				}
			}

			let header = '';
			for (let i = 0; i < lvl; i++) header = header + '#';
			if (lvl !== 0) header = header + ' ';
			
			const txt1 = value.substr(0, line_start);
			const txt2 = value.substr(line_start+hlvl);

			this.set_text(txt1 + header + txt2, header.length-hlvl, header.length-hlvl);
		}
	}
}
</script>

<style scoped>
	#toolbar {
		margin-bottom: 10px;
		background-color: #81c784;
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
		text-align: justify;
	}
</style>
