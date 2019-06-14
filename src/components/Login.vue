<template>
  <div class="container">
    <div class="alert alert-danger" :class="{ 'disactive': alert === null }">{{ alert }}</div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4" id="login">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" class="form-control" v-model="email" type="email" placeholder="E-mail">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            class="form-control"
            v-model="password"
            type="password"
            placeholder="Password"
          >
        </div>
        <button type="submit" class="btn btn-light" @click="login()">Login</button>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
import rest from "../rest.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      alert: null
    };
  },
  methods: {
    login() {
      rest.post(
        "/session",
        {
          email: this.email,
          password: this.password
        },
        (err, data) => {
          if (err) throw err;
          if (data.code === 0) window.location.replace('/');
          else this.alert = data.message;
        }
      );
    }
  },
  created() {
    rest.get("/session", null, (err, data) => {
      console.log("login.vue created() datacode:"+data.code);
      if (err) throw err;
      if (data.code === 1) this.alert = null;
      else if (data.code === 0) {
        rest.delete("/session", null, (err, data) => {
          if (err) throw err;
          if (data.code === 0) window.location.replace('/');
        });
      } else this.alert = data.message;
    });
  }
};
</script>

<style scoped>
.disactive {
  display: none;
}

#login {
  padding-top: 50px;
  padding-bottom: 70px;
  background-color: #43a047;
  box-shadow: 0 0 6px 2px #1b5e20;
}

button {
  width: 50%;
  margin-top: 10px;
  float: right;
}

label {
  margin-bottom: 2px;
}
</style>

