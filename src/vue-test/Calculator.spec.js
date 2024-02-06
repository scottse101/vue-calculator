import Calculator from '@/components/Calculator.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';  

describe('Calculator', () => {
  it('renders calculator component correctly', () => {
    const wrapper = mount(Calculator);
    // Add your assertions based on the expected behavior of the calculator component
    // For example, check if the necessary elements are present
    expect(wrapper.find('router-link')).toBeTruthy();
    expect(wrapper.find('router-view')).toBeTruthy();
  });

});