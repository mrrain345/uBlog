<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-2 col-lg-1">
          <img class="image" src="/user_photo.png" alt>
        </div>
        <div class="col-7 col-lg-9">
          <div class="row">
            <div class="col-12">
              <span id="user">{{ user }}</span>
            </div>
          </div>
        </div>
        <div class="col-3 col-lg-2">
          <button class="btn btn-success" @click="subscribing()" v-if="subscribe">Subscribe</button>
          <button class="btn btn-danger" @click="subscribing()" v-else>Unsubscribe</button>
          <span id="subscribes">{{ subscribes }}</span>
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
  name: "Header",
  data() {
    return {
      user: "User",
      subscribes: 0,
      avatar: "/user_photo.png",
      subscribe: false
    };
  },
  created() {
    rest.get("/article/1/subscribe", null, (err, data) => {
      if (err) throw err;
      if (data.code === 0) {
        this.subscribe = data.subscribed;
      }
    });
  },
  methods: {
    subscribing() {
      rest.put(
        "/article/1/subscribe",
        {
          subscribe: !this.subscribe
        },
        (err, data) => {
          if (err) throw err;
          if (data.code === 0) {
            console.log(data);
            this.subscribe = data.subscribed;
          }
        }
      );
    }
  }
};
</script>

<style scoped>
#user {
  font-size: 40px;
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
  text-align: right;
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
  width: 100%;
}
.subscribed {
  background-color: #4caf50;
}
@media screen and (min-width: 768px) {
  #user {
    font-size: 25px;
  }
}
</style>

