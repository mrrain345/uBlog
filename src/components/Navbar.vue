<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <span @click="setActive(-1)">µBlog</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="nav navbar-nav">
          <span @click="setActive(0)">
            <router-link class="nav-item nav-link" to="/">Main</router-link>
          </span>
          <span @click="setActive(1)" v-if="islogin">
            <router-link class="nav-item nav-link" to="/writer">New article</router-link>
          </span>
          <span @click="setActive(2)" v-if="islogin">
            <router-link class="nav-item nav-link" to="/profile">Profile</router-link>
          </span>
          <span @click="setActive(3)" v-if="islogin">
            <router-link class="nav-item nav-link" to="/login">logout</router-link>
          </span>
          <span @click="setActive(4)" v-if="!islogin">
            <router-link class="nav-item nav-link" to="/registration">Registration</router-link>
          </span>
          <span @click="setActive(5)" v-if="!islogin">
            <router-link class="nav-item nav-link" to="/login">Log in</router-link>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import rest from "../rest.js";

export default {
  name: "Navbar",
  data() {
    return {
      active: -1,
      islogin: false
    };
  },
  methods: {
    setActive(id) {
      this.active = id;
    }
  },
  created() {
    const path = window.location.pathname;
    this.active = -1;
/*    for (let i = 0; i < this.navs.length; i++) {
      if (this.navs[i].href === path) {
        this.active = i;
        break;
      }
    } */
    rest.get("/session", null, (err, data) => {
      if (err) throw err;
      if (data.code === 0) this.islogin = true;
      else this.login = false;
      console.log(this.islogin);
    });
  }
};
</script>

<style scoped>
</style>
