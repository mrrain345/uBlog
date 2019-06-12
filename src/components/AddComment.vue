<template>
  <div>
    <div class="container">
      <div class="row">
        <textarea
          id="source"
          class="form-control col-12"
          placeholder="Write a comment.."
          v-model="content"
        ></textarea>
      </div>
      <div class="row" style="margin-top: 8px;">
        <div class="col-11"></div>
        <button type="button" class="btn btn-success col-1" @click="comment()">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import rest from "../rest.js";
export default {
  name: "AddComment",
  props: ["article"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    comment() {
      rest.post(
        "/article/" + this.article + "/comments/",
        { content: this.content },
        (err, data) => {
          if (err) throw err;

          if (data.code === 0) {
            this.content = "";
            window.location.reload();
          }
        }
      );
    }
  }
};
</script>

<style scoped>
textarea {
  min-height: 170px;
  max-height: 170px;
}
</style>
