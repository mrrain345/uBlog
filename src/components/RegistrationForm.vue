<template>
  <div>
    <div class="container">
      <div class="row">
        <div id="terms" class="col-8">
          <h2>uBlog</h2>
        </div>
        <div id="register" class="col-4 w-100 p-3">
          <div id="registerForm">
            <p>
              <input
                id="login"
                class="form-control"
                v-model="login"
                type="text"
                name="login"
                placeholder="Login"
              >
            </p>
            <p>
              <input
                id="email"
                class="form-control"
                v-model="email"
                type="email"
                name="email"
                placeholder="E-mail"
              >
            </p>
            <p>
              <input
                id="pass1"
                class="form-control"
                v-model="pass1"
                type="password"
                name="pass1"
                placeholder="Password"
              >
            </p>
            <p>
              <input
                id="pass2"
                class="form-control"
                v-model="pass2"
                type="password"
                name="pass2"
                placeholder="Password repeat"
              >
            </p>
              <input id="registrationcheckbox" type="checkbox" v-model="checkbox">
              <p>I agree to the terms</p>
            <button type="submit" class="signupbtn">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'RegistrationForm',
	data() {
		return {
            login: '',
            email: '',
            pass1: '',
            pass2: '',
            checkbox: ''
		};
	},
	methods: {
		
	}
}
</script>

<style scoped>

button {
  width:100%;
  background-color: white;
  color: black;
  padding: 14px 20px;
  cursor: pointer;
}
.button:hover {
  background-color: #66bb6a;
}
.button:active {
  background-color: #43a047;
}
#terms {
  text-align: center;
  padding: 50px;
}
#registrationcheckbox {
  float: left;
  margin-top: 7px;
  margin-right: 5px;
}

#registerForm {
  height: 400px;
  width: 225px;
  margin: 100px auto;
}

#register {
  margin: 0 auto;
  background: #43a047;
  border-right: dotted 1px #81c784;
  border-left: dotted 1px #81c784;
}

</style>
