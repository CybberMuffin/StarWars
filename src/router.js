import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "films",
      component: () => import("./views/Films.vue")
    },
    {
      path: "/films/:id",
      name: "film",
      component: () => import("./views/Movie.vue")
    },
    {
      path: "/characters/:id",
      name: "character",
      component: () => import("./views/Character.vue")
    },
    {
      path: "/planets/:id",
      name: "planet",
      component: () => import("./views/Planet.vue")
    }
  ]
});
