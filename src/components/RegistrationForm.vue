<template>
  <div>
<div class="row">
    <div id="terms" class="col-8"> 
      <h2> uBlog </h2>
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
          v-model="name"
          type="password"
          name="pass1"
          placeholder="Password"
        >
      </p>
      <p>
        <input
          id="pass2"
          class="form-control"
          v-model="name"
          type="password"
          name="pass2"
          placeholder="Password repeat"
        >
      </p>
      <div class="input2">
      <input 
        id="registrationcheckbox" 
        type="checkbox" 
        value="Akceptuje regulamin">
        <p class="accepttext">I agree to the terms</p>
        </div>
        <button type="submit" class="signupbtn">Sign Up</button>
    </div>
    </div>

</div>

  </div>
</template>


<style scoped>

html, body {
  height: 100%;
}
.input2 {
  float: left;
  margin-left:20px;
  margin-right:10px;
  margin-top:10px;
}
button {
  background-color: white;
  color: black;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 80%;
  opacity: 0.9;
  margin-left: 20px;
}
#terms {
  text-align: center;
  padding:50px;
}
#registrationcheckbox {
  float:left;
  margin-top:7px;
  margin-right:5px;

}
.accepttext {
  float:left;
}

#toolbar {
  height: 48px;
  background-color: #4caf50;
  padding-left:5px;
}

#registerForm{
  height: 400px;
  width:225px;
	margin: 100px auto;


}

#register{
  height: 100%;
	margin:0 auto;
  background: #43a047;
  	border-right: dotted 1px #81c784;
		border-left: dotted 1px #81c784;
}


.input {
  float: left;
  margin-left:20px;
  margin-top:10px;
  border-radius: 5px;
}

.dropdown {
  float: left;
  width: 96px;
  height: 32px;
  margin: 8px;
  margin-right: 0;
  text-align: center;
  font-size: 18px;
  line-height: 1.8;
  font-weight: bold;
  background-color: #81c784;
  color: #c8e6c9;
  transition: all 0.3s;
}

.dropdown:hover,
.button:hover {
  background-color: #66bb6a;
}

.dropdown:active,
.button:active {
  background-color: #43a047;
}

textarea {
  height: 600px;
  outline: none;
  resize: none;
  border: none;
  border-right: dotted 1px #81c784;
  border-left: dotted 1px #81c784;
}

.markdown {
  border-right: dotted 1px #81c784;
}
</style>
