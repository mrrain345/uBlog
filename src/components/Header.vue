<template>
  <div>
    <div class="container">
      <div class="alert alert-danger" v-if="alert!==null">{{ alert }}</div>
      <div id="header" >
      <div class="row">
        <div class="col-2 col-lg-1" style="padding: 0;">
          <img class="image" :src="get_avatar()" alt="">
        </div>
        <div class="col-6 col-lg-9">
          <div class="row">
            <div class="col-12">
              <span id="user">{{ user.username }}</span>
              <span id="subscribes">{{ user.subscribes }} subs</span>
            </div>
          </div>
        </div>
        <div class="col-4 col-lg-2" style="padding:0;">
          <span v-if="!you">
            <button class="btn btn-danger" @click="subscribing(true)" v-if="!subscribe">Subscribe</button>
            <button class="btn btn-light" @click="subscribing(false)" v-else>Unsubscribe</button>
          </span>
        </div>
      </div>
    </div>
    </div>
    <Articles ref="article"/>
  </div>
</template>

<script>
import rest from "../rest.js";
import Articles from './Articles.vue';

export default {
  name: "Header",
  components: {
    Articles
  },
  data() {
    return {
      alert: null,
      username: '',
      you: false,
      id: 0,
      user: { id: 0, username: '', title: '', avatar: null, subscribes: 0 },
      subscribe: false
    };
  },
  created() {
    this.username = window.location.pathname.split('/')[2];

    rest.get("/user/"+this.username, null, (err, data) => {
      if (err) throw err;
      if (data.code !== 0) this.alert = data.message;
      else {
        this.user = data.user;
        this.id = parseInt(data.user.id);
        this.you = data.you;
        this.$refs.article.setId(this.id, this.you);

        rest.get("/article/"+this.id+"/subscribe", null, (err, data) => {
          if (err) throw err;
          if (data.code === 0) {
            this.subscribe = data.subscribed;
          }
        });
      }
    });
  },
  methods: {
    subscribing(sub) {
      rest.put(
        "/article/"+this.id+"/subscribe",
        {
          subscribe: sub
        },
        (err, data) => {
          if (err) throw err;
          if (data.code === 0) {
            this.subscribe = data.subscribed;
            this.user.subscribes += (sub ? 1 : -1);
          }
        }
      );
    },
    get_avatar() {
      if (this.user.avatar === null) return "/user_photo.png";
      else return this.user.avatar;
    }
  }
};
</script>

<style scoped>
#header {
  padding: 30px;
  margin-bottom: 20px;
  background-color: #66bb6a;
}

#user {
  font-size: 30px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#subscribes {
  font-size: 20px;
  color: #757575;
  width: 100%;
  display: block;
  overflow: hidden;
}
img {
  width: 100%;
  height: auto;
}
button {
  margin-top: 8px;
  padding-left: 5px;
  padding-left: 5px;
  width: 100%;
}
.subscribed {
  background-color: #4caf50;
}
@media screen and (min-width: 768px) {
  #user {
    font-size: 40px;
  }
}
</style>

