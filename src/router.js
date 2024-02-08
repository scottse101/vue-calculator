import { createRouter, createWebHistory } from "vue-router";
import ContactForm from "../src/components/ContactForm.vue";
import Calculator from "../src/components/Calculator.vue";

const routes = [
  {
    path: "/",
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
  history: createWebHistory(),
  routes,
});

export default router;
