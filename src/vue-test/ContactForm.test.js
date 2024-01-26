import { suite, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactForm from '@/path/to/ContactForm.vue';

suite('ContactForm.vue', () => {
  test('renders the component', () => {
    const wrapper = mount(ContactForm);
    assert.equal(wrapper.exists(), true);
  });

  test('disables submit button when form is invalid', async () => {
    const wrapper = mount(ContactForm);
    const submitButton = wrapper.find('button[type="submit"]');
    await wrapper.setData({ formData: { name: '', email: '', message: '' } });

    assert.equal(submitButton.attributes('disabled'), 'disabled');
  });

  test('shows error message if name contains numbers', async () => {
    const wrapper = mount(ContactForm);
    await wrapper.setData({ formData: { name: 'John123', email: 'john@example.com', message: 'Hello' } });
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    const statusMessage = wrapper.find('.status-message');
    assert.includes(statusMessage.text(), 'Name cannot contain numbers!');
  });

  test('emits form data when submitted with valid data', async () => {
    const wrapper = mount(ContactForm);
    const form = wrapper.find('form');
    await wrapper.setData({
      formData: { name: 'John Doe', email: 'john@example.com', message: 'Hello' },
    });
    await form.trigger('submit.prevent');

    assert.equal(wrapper.emitted().submitForm[0][0], {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    });
  });
});
