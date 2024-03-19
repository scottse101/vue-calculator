import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Check authentication state before mounting the app
router.beforeEach((to, from, next) => {
    // Check if the user is authenticated
    const isAuthenticated = checkAuth(); // You need to implement this function
  
    // If the route requires authentication and the user is not authenticated,
    // redirect them to the login page
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: "LoginForm" });
    } else {
      // Otherwise, allow the navigation
      next();
    }
  });
  
  // Function to check authentication state (example)
  function checkAuth() {
    // Retrieve authentication state from localStorage or other storage mechanism
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    // Return true if the user is logged in, false otherwise
    return isLoggedIn === "true";
  }

app.mount("#app");
