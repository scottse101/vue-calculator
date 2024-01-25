import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ContactForm from './ContactForm.vue';
import Calculator from './Calculator.vue';
import store from './store';
import './assets/main.css';

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

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');