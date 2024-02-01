const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      message: "Hello Vue!",
    };
  },

  methods: {},
});
app.mount("#root");
