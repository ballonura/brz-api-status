export default {
  target: "static",

  head: {
    title: "BreezoMeter Status",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      }
    ]
  },

  css: ["@/assets/css/global.scss"],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/tailwindcss"],

  modules: ["@nuxtjs/axios", "@nuxt/content"],

  axios: {
    baseURL: "https://api.breezometer.com"
  },

  content: {},

  build: {}
};
