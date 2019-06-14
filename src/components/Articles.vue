<template>
  <div class="container">
    <div class="entries" v-for="(article, id) in articles" :key="id">
      <div class="entry" @click="articleClick(id)">
        <div class="entrytxt">
          <div class="row">
            <div id="title">{{ article.title }}</div>
            <a :href="'/u/'+article.username" v-if="!you"><div id="author">{{ article.username }}</div></a>
          </div>
          <VueMarkdown class="markdown col-12" :source="article.content">{{article.content}}</VueMarkdown>
          <div id="show">Show more</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rest from "../rest.js";
import VueMarkdown from "vue-markdown";

export default {
  name: "Articles",
  components: {
    VueMarkdown
  },
  props: [ 'main' ],
  data() {
    return {
      id: 0,
      you: false,
      articles: []
    };
  },
  methods: {
    getArticles(id) {
      rest.get(
        "/user/" + id + "/articles",
        null,
        (err, data) => {
          if (err) throw err;
          this.articles = data;
        }
      );
    },
    getAllArticles() {
        rest.get(
          "/articles",
          null,
          (err, data) => {
            if (err) throw err;
            this.articles = data;
          }
        );
    },
    articleClick(id) {
      this.$router.push({ path: this.articles[id].url });
    },
    setId(id, you) {
      this.id = id;
      this.you = (you === true);
      this.getArticles(id);
    }
  },
  created() {
  	if (this.main !== undefined) this.getAllArticles();
  }
};
</script>

<style scoped>
#title {
  margin-left: 10px;
  font-size: 40px;
  font-weight: bold;
}
#author {
  margin-top: 16px;
  margin-left: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #c8e6c9;
}
#show {
  margin-top: 10px;
  font-size: 18px;
  color: #e0e0e0;
}
.entry {
  padding: 30px;
  margin-bottom: 20px;
  background-color: #66bb6a;
  cursor: pointer;
}

.markdown {
  text-align: justify;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
	max-height: 210px;
}
</style>
