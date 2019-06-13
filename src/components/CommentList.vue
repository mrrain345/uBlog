<template>
  <div>
    <AddComment :article="article"/>
    <div v-for="(comment, id) in comments" :key="id">
      <Comment
        :article="comment.article"
        :id="comment.id"
        :content="comment.content"
        :author="comment.username"
        :like="comment.likes"
        :dislike="comment.dislikes"
        :date="comment.date"
        :avatar="get_avatar(id)"
      />
    </div>
  </div>
</template>

<script>
import rest from "../rest.js";
import Comment from "./Comment";
import AddComment from "./AddComment";

export default {
  name: "CommentList",
  components: {
    Comment,
    AddComment
  },
  data() {
    return { comments: [], article: 1 };
  },
  created() {
    rest.get("/article/" + this.article + "/comments", null, (err, data) => {
      if (err) throw err;

      if (data.code === 0) {
        this.comments = data.comments;
      }
    });
  },
  methods: {
    get_avatar(id) {
      if (this.comments[id].avatar === null) return "/user_photo.png";
      else return this.comments[id].avatar;
    }
  }
};
</script>
