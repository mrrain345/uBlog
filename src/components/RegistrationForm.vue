<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="d-none d-sm-block col-sm-6 col-md-7 col-lg-8">
          <h1>µBlog</h1>
          <h3 class="text-muted">Create your own blog</h3>
        </div>
        <div id="register" class="col-8 col-sm-6 col-md-5 col-lg-4">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="form-group">
                <label for="login">Login</label>
                <input
                  id="login"
                  class="form-control"
                  v-model="login"
                  type="text"
                  placeholder="Login"
                >
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  id="email"
                  class="form-control"
                  v-model="email"
                  type="email"
                  placeholder="E-mail"
                >
              </div>
              <div class="form-group">
                <label for="title">Blog title</label>
                <input
                  id="title"
                  class="form-control"
                  v-model="title"
                  type="text"
                  placeholder="Blog title"
                >
              </div>
              <div class="form-group">
                <label for="pass1">Password</label>
                <input
                  id="pass1"
                  class="form-control"
                  v-model="pass1"
                  type="password"
                  placeholder="Password"
                >
              </div>
              <div class="form-group">
                <label for="pass2">Confirm password</label>
                <input
                  id="pass2"
                  class="form-control"
                  v-model="pass2"
                  type="password"
                  placeholder="Confirm password"
                >
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="checkbox" v-model="checkbox">
                <label class="form-check-label" for="checkbox">I agree to the terms</label>
              </div>
              <button type="submit" class="btn btn-light">Sign Up</button>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  data() {
    return {
      login: "",
      email: "",
      pass1: "",
      pass2: "",
      checkbox: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
h1 {
    margin-top: 75px;
    color: #4CAF50;
    text-align: center;
}
h3 {
    text-align: center;
}
label {
    margin-bottom: 2px;
}

button {
  width: 100%;
  margin-top: 50px;
}
#terms {
  text-align: center;
  padding: 50px;
}
#register {
  padding-top: 70px;
  padding-bottom: 140px;
  margin: 0 auto;
  background: #43a047;
  box-shadow: 0 0 6px 2px #1b5e20;
}
</style>
