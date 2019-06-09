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
import rest from "../rest.js";
export default {
	name: 'Articles',
	data(){
		return{
			articles:[]
		}
	},
	methods:{
		getArticles(id){
			 rest.get(
        "/user/"+id+"/articles",
	  
		 null,
		 
        (err, data) => {
		  if (err) throw err;
		  this.articles = data;
        }
      );
		}
	},
	created(){
		this.getArticles(1);
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
