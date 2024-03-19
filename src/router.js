import { createRouter, createWebHistory } from "vue-router";
import ContactForm from "../src/components/ContactForm.vue";
import Calculator from "../src/components/Calculator.vue";
import LoginForm from "../src/components/LoginForm.vue";

const routes = [
  {
    path: "/",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: "/Calculator",
    name: "Calculator",
    component: Calculator,
  },
  {
    path: "/ContactForm",
    name: "ContactForm",
    component: ContactForm,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
