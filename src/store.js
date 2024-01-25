import { createStore } from 'vuex';

export default createStore({
  state: {
    contactFormData: {
      name: '',
      email: '',
      message: '',
    },
    statusMessage: '',
  },
  mutations: {
    updateContactFormData(state, payload) {
      state.contactFormData = { ...state.contactFormData, ...payload };
    },
    updateStatusMessage(state, message) {
      state.statusMessage = message;
    },
  },
});