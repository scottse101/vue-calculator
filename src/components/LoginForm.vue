<template>
    <div class="login-container">
        <h1 class="login-title">Login</h1>
        <form @submit.prevent="login" class="login-form">
            <div class="form-group">
                <label for="username" class="form-label">Username:</label>
                <input type="text" id="username" v-model="username" class="form-input">
            </div>
            <div class="form-group">
                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" v-model="password" class="form-input">
            </div>
            <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>

import { checkUsername, login, register } from '../api/UserHooks';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
    async handleSubmit() {
      try {
        const response = await checkUsername(this.username);
        if (response === 'Username is available') {
          await this.register();
        } else {
          await this.login();
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while processing your request';
      }
    },

    async login() {
      const user = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await login(user);
        alert('Login successful');
        this.$router.push({ path: '/calculator' });
        localStorage.setItem('username', this.username);
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Invalid username or password';
      }
    },
    
    async register() {
      const user = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await register(user);
        alert('Registration successful');
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while processing your request';
      }
    }
  }
}
</script>

<style>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #282c34;
    font-size: calc(10px + 2vmin);
    color: white;
    max-width: 30vw;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
}

.login-form {
    width: 100%;
}

.form-group {
    margin-bottom: 15px;
}

.form-label {
    font-weight: bold;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-button:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>