<template>

<div id="calculator">
       <router-link to="/">Calculator</router-link>
       <router-view></router-view>   
</div>

  <div>
      <h2>Contact form</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Navn:</label>
          <input v-model="name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">E-postadresse:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="message">Melding:</label>
          <textarea v-model="message" id="message" required></textarea>
        </div>
        <button :disabled="!isFormValid" type="submit">Submit</button>
      </form>
    </div>
  </template>

  <script>
  import { useStore } from '../store.js';
  import { ref } from 'vue';
  import { computed } from 'vue';
  
  export default {
    setup() {
      const store = useStore();

      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const name = ref('');
      const email = ref('');
      const message = ref('');

      if (store.name) {
        name.value = store.name;
      }

      if (store.email) {
        email.value = store.email;
      }

      const isFormValid = computed(() => {
        console.log('isFormValid computed');
        console.log('name.value', name.value);
        console.log('email.value', email.value);
        console.log('message.value', message.value);
        console.log(name.value.trim() !=='')
        console.log(isValidEmail(email))
        console.log(message.value.trim() !== '')
        return name.value.trim() !=='' && isValidEmail(email.value) && message.value.trim() !== '';
      });

  
      const submitForm = async () => {
        if (isFormValid.value) {
          try {
            const response = await fetch('http://localhost:3001/responses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value,
              })
        });

        const responseData = await response.json();
        
          store.setName(responseData.name);
          store.setEmail(responseData.email);

          alert('Form submitted!');

          resetMessage();
        } catch (error) {
          console.error('Error submitting form!', error);
        }
       } else {
        console.log('Form is invalid!');
       } 
      };

      const resetMessage = () => {
        message.value = '';
      };

      const resetForm = () => {
        store.setName('');
        store.setEmail('');
        name.value = '';
        email.value = '';
        message.value = '';
      };

      return {
      store,
      name,
      email,
      message,
      isFormValid,
      isValidEmail,
      submitForm,
      resetForm,
      };
    },
  };
  </script>
  
  <style scoped>
    .contact-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
    }
    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .form-group label {
        margin-bottom: 0.5rem;
    }

    .form-group textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .form-group textarea {
        min-height: 200px;
    }

    .status-message {
        margin-top: 1rem;
        padding: 0.5rem;
        border-radius: 4px;
    }

    .status-message.success {
        background-color: lightgreen;
    }

    .status-message.error {
        background-color: lightcoral;
    }

    .status-message.hidden {
        display: none;
    }

    button {
        padding: 0.5rem;
        border-radius: 4px;
        border: none;
        background-color: lightblue;
        cursor: pointer;
    }

    button:disabled {
        background-color: lightgrey;
        cursor: not-allowed;
    }

    button:hover {
        background-color: lightgreen;
    }

    button:active {
        background-color: green;
        color: white;
    }

    button:focus {
        outline: none;
    }

    button:disabled:hover {
        background-color: lightgrey;
    }

    button:disabled:active {
        background-color: lightgrey;
    }

    button:disabled:focus {
        outline: none;
    }

  </style>
  