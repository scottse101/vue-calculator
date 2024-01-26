import { createRouter, createWebHistory } from 'vue-router';
import ContactForm from './ContactForm.vue';
import Calculator from './Calculator.vue';

const routes = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator,
  },
  {
    path: '/ContactForm',
    name: 'ContactForm',
    component: ContactForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;