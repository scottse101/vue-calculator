import { suite, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Calculator from '@/path/to/Calculator.vue';

suite('Calculator.vue', () => {
  test('renders the component', () => {
    const wrapper = mount(Calculator);
    assert.equal(wrapper.exists(), true);
  });

  test('updates the display on button click', async () => {
    const wrapper = mount(Calculator);
    await wrapper.setData({ inputString: '1+2' });
    const addButton = wrapper.find('.btn-group');
    await addButton.trigger('click');

    assert.equal(wrapper.vm.inputString, '1+2+');
  });

  test('calculates the result on form submission', async () => {
    const wrapper = mount(Calculator);
    await wrapper.setData({ inputString: '3+5' });
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    assert.equal(wrapper.vm.result, '8');
  });
});
