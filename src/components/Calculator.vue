<template>
  <button class="logout-button" @click="logout">Logout</button>
  <div class="app-contatiner">
    <div id="contact-form-container" class="form-container">
      <router-link to="/Calculator">Calculator</router-link>
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

      <!-- Output Area -->
      <div id="output-area" class="output-area">
        <div class="current-expression">
          <input type="text" v-model="expression" readonly />
        </div>
        <div v-for="(calculationResult, index) in calculationResults" :key="index" class="previous-answer" @click="setExpression(calculationResult.expression, calculationResult.answer)">
          {{ calculationResult.expression }} = {{ calculationResult.answer }}
        </div>
      </div>

      <!-- Pagination Buttons -->
      <div id="pagination-buttons">
        <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages - 1">Next</button>
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
            <button @click="() => updateDisplay('/')" button class="btn btn-group">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculate, getCalculationResultsByUserId } from '@/api/CalculatorHooks';
import { getUserByUsername, getUserIdByUsername } from '@/api/UserHooks';
import { createCalculationRequest } from '@/utils/createCalculationRequest';

export default {
  created() {
    const username = localStorage.getItem('username');
    console.log('Logged in user:', username);

    this.loadCalculationResults(0);
  },

  data() {
    return {
      inputString: "",
      result: "",
      calculationLog: [],
      currentPage: 0,
      pageSize: 10,
      errorMessage: "",
    };
  },

  methods: {
    updateDisplay(value) {
      if (/[\d+\-*/%.]/.test(value)) {
        this.inputString += value;
        console.log(this.inputString)
      } else {
        console.error("Invalid Input");
      }
    },

    async calculate() {
      const result = await calculate(this.inputString);
      console.log('Result:', result);
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

    setExpression(inputString, answer) {
      this.inputString = inputString + " = " + answer;
    },

    logout() {
      localStorage.removeItem('username');
      this.$router.push('/');
    },

    async pushAnswer() {
      this.inputString = this.inputString + " = " + this.answer;
      await this.loadCalculationResults(this.currentPage);
    },
  
    async loadCalculationResults(currentPage) {
      try {
        const username = localStorage.getItem('username');
        const userId = await getUserIdByUsername(username);

        const response = await getCalculationResultsByUserId(userId, currentPage, this.pageSize);

        this.calculationResults = response.content;

        console.log('Calculation Results:', this.calculationResults);
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = error.message;
      }
    },

    async prevPage() {
      if (this.currentPage > 0) {
        await this.loadCalculationResults(this.currentPage - 1);
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        await this.loadCalculationResults(this.currentPage + 1);
      }
    },

    async calculateAndSaveResult(equation) {
      try {
        const username = localStorage.getItem('username');
        const user = await getUserByUsername(username);
        const CalculationRequest = createCalculationRequest(equation, user); 
        console.log('User name:', getUserByUsername(username));
        console.log('Calculation Request:', CalculationRequest);

        const result = await calculate(equation, user);
        console.log('Result:', result);

        await this.pushAnswer();

      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 400) {
          this.errorMessage = 'Input a valid equation';
        } else {
          this.errorMessage = 'An error occured. Please try again.';
        
        }
      }
    }


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

.previous-answer {
  margin-top: 10px;
  cursor: pointer;
  border: 2px solid #000;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(179, 179, 179, 0.25); /* RGBA color format with opacity set to 0.5 */
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
}

.previous-answer:hover {
  background-color: rgba(204, 204, 204, 0.75); /* RGBA color format with opacity set to 0.5 */
}

.logout-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 8px 16px;
  background-color: #cccccc;
  border: 2px solid #000;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.2rem;
}

.logout-button:hover {
  background-color: #b3b3b3;
}

</style>
