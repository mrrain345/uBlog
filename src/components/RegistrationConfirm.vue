<template>
  <div class="container">
    <h3
      class="text-muted"
      style="margin-top: 60px;"
    >Registration complete. Please check your e-mail.</h3>
    <div class="alert alert-danger" :class="{ 'disactive': alert === null }">{{ alert }}</div>
  </div>
</template>

<script>
import rest from "../rest.js";

export default {
  name: "RegistrationConfirm",
  data() {
    return {
      alert: null
    };
  },
  created() {
    let query = {};
    location.search
      .substr(1)
      .split("&")
      .forEach(function(item) {
        query[item.split("=")[0]] = item.split("=")[1];
      });
    if (query.token === undefined) return;
    rest.post(
      "/registration/token",
      {
        token: query.token
      },
      (err, data) => {
        if (err) throw err;
        if (data.code !== 0) this.alert = data.message;
        else this.$router.push({ path: "/" });
      }
    );
  }
};
</script>

<style scoped>
.disactive {
  display: none;
}
</style>