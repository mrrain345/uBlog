<template>
    <div>
        <div v-for="(comment, id) in comments" :key="id">
            <Comment 
                :article="comment.article"
                :id="comment.id"
                :content="comment.content"
                :author="comment.username"
                :likes="comment.likes"
                :dislikes="comment.dislikes"
                :date="comment.date"
                :avatar="get_avatar(id)"
            />
        </div>
    </div>
</template>

<script>
import rest from '../rest.js';
import Comment from './Comment';

export default {
    name: 'CommentList',
    components: {
		Comment
	},
    data(){
        return { comments: [], article: 1 }
    },
    created(){
            rest.get("/article/"+this.article+"/comments", 
      null, (err, data) => {
                if (err) throw err;
                 
				if(data.code===0){
                    this.comments = data.comments;
                    console.log(data.comments[0])
                }
			});
    },
    methods: {
        get_avatar(id){
            console.log(id);
            if(id===null) return "/user_photo.png";
            else return this.comments[id].avatar;
        }
    }
}
</script>
