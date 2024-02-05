import Calculator from '@/Calculator.vue';
import { mount } from 'vitest';

describe('Calculator', () => {
  it('renders calculator component correctly', () => {
    const wrapper = mount(Calculator);
    // Add your assertions based on the expected behavior of the calculator component
    // For example, check if the necessary elements are present
    expect(wrapper.find('router-link')).toBeTruthy();
    expect(wrapper.find('router-view')).toBeTruthy();
  });

  // Add more test cases for the calculator component as needed
});