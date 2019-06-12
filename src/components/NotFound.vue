<template>
  <div class="container">
    <h1 style="margin-top: 40px;">404: Not Found</h1>
    <p>
      The requested URL
      <b>{{ url }}</b> was not found on this server
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  computed: {
    url: () => {
      return window.location.pathname + window.location.search;
    }
  }
};
</script>