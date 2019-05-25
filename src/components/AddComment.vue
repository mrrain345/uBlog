<template>
	<div>
        <div class="container">
            <div class="row">
                <div class="col-1">
                	<img class="image" src="" alt="Generic placeholder image">
                </div>
			    <textarea id="source" class="form-control col-11" placeholder="Write a comment.." v-model="content"></textarea>
		    </div>
            <div class="row" style="margin-top: 8px;">
                <div class="col-11"></div>
                <button type="button" class="btn btn-success col-1" @click="comment()">Comment</button>                              
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'AddComment',
	data() {
		return {
			content: ''
		};
	},
	methods: {
		comment(){
			console.log(this.content);
			this.content='';
		}
	}
}

</script>

<style scoped>
	textarea{
		min-height: 170px;
		max-height: 170px;
	}
</style>
