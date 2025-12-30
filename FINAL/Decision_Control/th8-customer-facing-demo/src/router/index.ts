import { createRouter, createWebHistory } from "vue-router";
import CustomerFacingOverviewPage from "../pages/CustomerFacingOverviewPage.vue";

const routes = [
  { path: "/", redirect: "/overview" },
  { path: "/overview", component: CustomerFacingOverviewPage }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
