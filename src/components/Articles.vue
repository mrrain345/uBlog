<template>
	<div class="container">
		<div class="entries" v-for="(article, id) in articles" :key="id">
			<div class="entry">
				<div class="entrytxt">
					<h2>{{article.title}}</h2>
					<p>{{article.content}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Articles',
	data(){
		return{
			articles:[
				{title: "Tytuł artykułu", content:"Lorem ipsum sit amet, consectetur adipiscing elit exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, ergo draco maledicte, ut ecclesiam tuam secura, tibi facias libertate servire, te rogamus, audi nos."},
				{title: "Tytuł artykułu", content:"Lorem ipsum sit amet, consectetur adipiscing elit exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, ergo draco maledicte, ut ecclesiam tuam secura, tibi facias libertate servire, te rogamus, audi nos."}
			]
		}
	}
}
</script>

<style scoped>
	

	
	.entry
	{
		padding: 30px;
		margin-bottom: 20px;
		background-color: #66bb6a;
	}

	p
	{
		text-align: justify;
	}

</style>
