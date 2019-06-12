<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <div id="title">{{article.title }}</div>
              <div id="date">{{ article.creation_date }}</div>
            </div>
          </div>
          <div class="row" style="margin-top: 4px;">
            <VueMarkdown class="markdown col-12" :source="article.content">{{article.content}}</VueMarkdown>
          </div>
          <div class="row">
            <div class="col-6">
              <span id="views">{{article.views}} views</span>
            </div>
            <div class="col-6">
              <span @click="clicked(2)">
                <div
                  class="reaction"
                  :class="{ 'pressed-reaction': reaction==2 }"
                >{{ article.dislikes }}</div>
                <i
                  class="material-icons"
                  :class="{ 'pressed-reaction': reaction==2 }"
                >thumb_down_alt</i>
              </span>
              <span @click="clicked(1)">
                <div
                  class="reaction"
                  :class="{ 'pressed-reaction': reaction==1 }"
                >{{ article.likes }}</div>
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
import VueMarkdown from "vue-markdown";
export default {
  name: "ArticleBox",
  components: {
    VueMarkdown
  },
  data() {
    return {
      reaction: 0,
      id: 4,
      article: {
        title: "",
        content: "",
        creation_date: "",
        views: 0,
        likes: 0,
        dislikes: 0
      }
    };
  },
  methods: {
    clicked(id) {
      if (this.reaction === id) {
        this.reaction = 0;
      } else {
        this.reaction = id;
      }
      rest.put(
        "/article/" + this.id + "/reaction",
        { reaction: this.reaction },
        (err, data) => {
          if (err) throw err;

          if (data.code === 0) {
            this.reaction = data.reaction;
          }
        }
      );
    }
  },
  created() {
    rest.get("/article/" + this.id, null, (err, data) => {
      if (err) throw err;

      if (data.code === 0) {
        this.article = data.article;
      }
    });

    rest.get("/article/" + this.id + "/reaction", null, (err, data) => {
      if (err) throw err;

      if (data.code === 0) {
        this.reaction = data.reaction;
      }
    });
  }
};
</script>

<style scoped>
#title {
  font-size: 40px;
  font-weight: bold;
}
#date {
  margin-left: 10px;
  font-size: 20px;
  color: #757575;
}
#views {
  margin-left: 10px;
  font-size: 15px;
  color: #757575;
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
.markdown {
  text-align: justify;
}
</style>
