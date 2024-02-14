<template>
  <div class="app-contatiner">
    <div id="contact-form-container" class="form-container">
      <router-link to="/">Calculator</router-link>
      <router-link to="/ContactForm">Contact</router-link>

      <router-view></router-view>
    </div>

    <div class="calculator-container">
      <div class="display">
        <form action="" @submit.prevent="calculate">
          <input
            class="input"
            type="text"
            readonly="readonly"
            v-model="inputString"
          />
          <input class="equal" type="submit" value="=" />
        </form>
      </div>

      {{ result }}

      <div class="calculation-log">
        <ul>
          <li v-for="calculation in calculationLog">{{ calculation }}</li>
        </ul>
      </div>

      <div class="buttons">
        <div class="row">
          <div class="columns">
            <button @click="clearDisplay" button class="btn btn-first-row">
              C
            </button>
            <button @click="negativeSign" button class="btn btn-first-row">
              +/-
            </button>
            <button @click="deleteValue" button class="btn btn-first-row">
              DEL
            </button>
          </div>
        </div>

        <div class="row">
          <div class="columns">
            <button @click="() => updateDisplay('1')" button class="btn">
              1
            </button>
            <button @click="() => updateDisplay('2')" button class="btn">
              2
            </button>
            <button @click="() => updateDisplay('3')" button class="btn">
              3
            </button>
            <button
              @click="() => updateDisplay('+')"
              button
              class="btn btn-group"
            >
              +
            </button>
          </div>
        </div>

        <div class="row">
          <div class="columns">
            <button @click="() => updateDisplay('4')" button class="btn">
              4
            </button>
            <button @click="() => updateDisplay('5')" button class="btn">
              5
            </button>
            <button @click="() => updateDisplay('6')" button class="btn">
              6
            </button>
            <button
              @click="() => updateDisplay('-')"
              button
              class="btn btn-group"
            >
              -
            </button>
          </div>
        </div>

        <div class="row">
          <div class="columns">
            <button @click="() => updateDisplay('7')" button class="btn">
              7
            </button>
            <button @click="() => updateDisplay('8')" button class="btn">
              8
            </button>
            <button @click="() => updateDisplay('9')" button class="btn">
              9
            </button>
            <button
              @click="() => updateDisplay('*')"
              button
              class="btn btn-group"
            >
              *
            </button>
          </div>
        </div>

        <div class="row">
          <div class="columns">
            <button @click="() => updateDisplay('.')" button class="btn">
              .
            </button>
            <button @click="() => updateDisplay('0')" button class="btn">
              0
            </button>
            <button @click="() => updateDisplay('%')" button class="btn">
              %
            </button>
            <button
              @click="() => updateDisplay('/')"
              button
              class="btn btn-group"
            >
              /
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as math from "mathjs";
import { calculate, calculateJSON } from '../api/CalculatorHooks';

export default {
  data() {
    return {
      inputString: "",
      result: "",
      calculationLog: [],
    };
  },
  methods: {
    updateDisplay(value) {
      if (/[\d+\-*/%.]/.test(value)) {
        this.inputString += value;
      } else {
        console.error("Invalid Input");
      }
    },
    async calculate() {
      try {
        const response = await calculate(this.inputString);
        console.log('response', response);

        const responseJSON = await calculateJSON(this.inputString);
        console.log('responseJSON', responseJSON);

        this.inputString = this.inputString + " = " + response.result;
        this.calculationLog.push(response.result);

      } catch (error) {
        console.error("Error calculating result", error);
        this.inputString = 'undefined';
        this.calculationLog.push('undefined');
        this.inputString = '';
      }
    },
    clearDisplay() {
      this.inputString = "";
      this.result = "";
    },
    negativeSign() {
      this.inputString = this.inputString * -1;
    },
    deleteValue() {
      this.inputString = this.inputString.slice(0, -1);
    },
  },
};
</script>


<style>
.app-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.calculator-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  min-height: 50vh;
  max-width: 30vw;
  font-size: calc(10px + 2vmin);
  color: white;
  margin-right: 5px;
}

.btn-group {
  color: white;
  background-color: chocolate;
}

.btn-first-row {
  color: black;
  background-color: grey;
}

.btn {
  margin: 5px;
  width: 50px;
  height: 50px;
}

.equal {
  margin: 5px;
  width: 40px;
  height: 40px;
  background-color: chocolate;
  color: white;
}

.input {
  width: 200px;
  height: 40px;
  margin: 5px;
  font-size: 20px;
}

.calculation-log {
  overflow-y: scroll;
  max-height: 200px;
  max-lines: 5;
}

.contact-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
  color: white;
  max-width: 30vw;
}

.form-containter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}
</style>
