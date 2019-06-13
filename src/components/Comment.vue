<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-2 col-lg-1">
          <img class="image" :src="avatar" alt>
        </div>
        <div class="col-10 col-lg-11">
          <div class="row">
            <div class="col-12">
              <span id="author">{{ author }}</span>
              <span id="date">{{ date }}</span>
            </div>
          </div>
          <div class="row" style="margin-top: 4px;">
            <div class="col-12" id="content">{{ content }}</div>
          </div>
          <div class="row">
            <div class="col-10"></div>
            <div class="col-2">
              <span @click="clicked(2)">
                <div class="reaction" :class="{ 'pressed-reaction': reaction==2 }">{{ dislikes }}</div>
                <i
                  class="material-icons"
                  :class="{ 'pressed-reaction': reaction==2 }"
                >thumb_down_alt</i>
              </span>
              <span @click="clicked(1)">
                <div class="reaction" :class="{ 'pressed-reaction': reaction==1 }">{{ likes }}</div>
                <i class="material-icons" :class="{ 'pressed-reaction': reaction==1 }">thumb_up_alt</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 8px;">
        <div class="col-11"></div>
      </div>
    </div>
  </div>
</template>

<script>
import rest from "../rest.js";

export default {
  name: "Comment",
  data() {
    return { reaction: 0, likes: 0, dislikes: 0 };
  },
  props: [
    "article",
    "id",
    "content",
    "author",
    "date",
    "avatar",
    "like",
    "dislike"
  ],
  methods: {
    clicked(id) {
      rest.put(
        "/article/" + this.article + "/comments/" + this.id + "/reaction",
        { reaction: this.reaction === id ? 0 : id },
        (err, data) => {
          if (err) throw err;

          if (data.code === 0) {
            if (this.reaction !== 0 && data.reaction !== this.reaction) {
              if (data.reaction === 1) {
                this.likes++;
                this.dislikes--;
              } else if (data.reaction === 2) {
                this.likes--;
                this.dislikes++;
              } else if (this.reaction === 1) {
                this.likes--;
              } else if (this.reaction === 2) {
                this.dislikes--;
              }
            } else {
              if (data.reaction === 1) {
                this.likes++;
              } else if (data.reaction === 2) {
                this.dislikes++;
              }
            }
            this.reaction = data.reaction;
          }
        }
      );
    }
  },
  created() {
    this.likes = this.like;
    this.dislikes = this.dislike;
    rest.get(
      "/article/" + this.article + "/comments/" + this.id + "/reaction",
      null,
      (err, data) => {
        if (err) throw err;

        if (data.code === 0) {
          this.reaction = data.reaction;
        }
      }
    );
  }
};
</script>

<style scoped>
#author {
  font-size: 20px;
  font-weight: bold;
}
#date {
  margin-left: 10px;
  font-size: 15px;
  color: #757575;
}
img {
  width: 100%;
  height: auto;
}
.reaction {
  color: #757575;
  margin: 0 4px;
  float: right;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s;
}
.material-icons {
  color: #757575;
  display: block;
  float: right;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s;
}
.pressed-reaction {
  color: #43a047;
}
.reaction:hover {
  color: #616161;
}
.material-icons:hover {
  color: #616161;
}
.pressed-reaction:hover {
  color: #388e3c;
}
</style>
