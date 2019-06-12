<template>
  <div class="container">
    <pre>{{ alert }}</pre>
    <input type="text" class="form-control" v-model="email" placeholder="Email">
    <input type="password" class="form-control" v-model="password" placeholder="Password">
    <button class="btn btn-success" @click="login()">Login</button>
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
      alert: ""
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
          this.alert = JSON.stringify(data, null, 2);
        }
      );
    }
  },
  created() {
    rest.get("/session", null, (err, data) => {
      if (err) throw err;
      this.alert = JSON.stringify(data, null, 2);
    });
  }
};
</script>
