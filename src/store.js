import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
      name: '',
      email: '',
      statusMessage: '',
  }),
  actions: {
    saveNameAndEmail(name, email) {
      this.setName(name);
      this.setEmail(email);
    },

    setName(name) {
      this.name = name;
    },

    setEmail(email) {
      this.email = email;
    },

  },
});