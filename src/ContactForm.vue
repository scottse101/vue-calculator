<template>
    <div>
      <h2>Contact form</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Navn:</label>
          <input v-model="formData.name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">E-postadresse:</label>
          <input v-model="formData.email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="message">Melding:</label>
          <textarea v-model="formData.message" id="message" required></textarea>
        </div>
        <button :disabled="!isValid" type="submit">Send</button>
        <div class="status-message">{{ statusMessage }}</div>
      </form>
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    computed: {
      isValid() {
        return (
          this.formData.name.trim() !== '' &&
          this.formData.email.trim() !== '' &&
          this.formData.message.trim() !== ''
        );
      },
      statusMessage() {
        return this.$store.state.statusMessage;
      },
    },
    watch: {
      formData: {
        deep: true,
        handler(newFormData) {
          this.$store.commit('updateContactFormData', newFormData);
        },
      },
    },
    methods: {
      submitForm() {
        if (!this.isValid) {
          this.$store.commit('updateStatusMessage', 'error'); 
          return;
        }

        if (/\d/.test(this.formData.name)) {
        this.$store.commit('updateStatusMessage', 'error');
        this.$store.commit('updateStatusMessage', 'Name cannot contain numbers!');
      return;
      }

        this.$store.commit('updateStatusMessage', 'success'); // Simulerer backend-respons
      },


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
  