import Calculator from "@/components/Calculator.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, assert, test } from "vitest";

test("Calculator: Test updateDisplay method ", async () => {
  const wrapper = mount(Calculator);

  const calculator = wrapper.vm;

  calculator.updateDisplay("5");
  assert.equal(calculator.inputString, "5");

  calculator.updateDisplay("7");
  assert.equal(calculator.inputString, "57");

  calculator.updateDisplay("+");
  assert.equal(calculator.inputString, "57+");

  calculator.updateDisplay("3");
  assert.equal(calculator.inputString, "57+3");

  calculator.updateDisplay("=");
  calculator.calculate();
  assert.equal(calculator.inputString, "60");
  assert.equal(
    calculator.calculationLog[calculator.calculationLog.length - 1],
    "60",
  );
  assert.equal(calculator.calculationLog.length, 1);

  wrapper.unmount();
});
