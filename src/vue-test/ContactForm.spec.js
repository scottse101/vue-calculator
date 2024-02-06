import ContactForm from '@/components/ContactForm.vue';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, it, expect} from 'vitest';

const pinia = createPinia();

const app = createApp(pinia)
app.use(pinia)

describe('ContactForm', () => {
  it('renders contact form component correctly', async () => {
    const wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('form');

    wrapper.unmount();
  });

  it ('submits the form', async () => {
    const wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
      props: {
        name: 'Scott Pilgrim',
        email: 'scottpilgrim@example.com',
        message: 'I am a rockstar!',
      }
    })

    const sumbitFormSpy = vi.spyOn(wrapper.vm, 'submitForm')

    await wrapper.find('form').trigger('submit.prevent')

    expect(sumbitFormSpy).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('does not submit the form if the name is empty', async () => {
    const wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
      props: {
        name: '',
        email: '',
        message: '',
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted().sumbitForm).toBeFalsy('Name is required');

    wrapper.unmount();

  });

});


