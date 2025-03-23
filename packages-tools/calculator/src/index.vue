<script setup>
import { ref } from 'vue'

// 响应式状态
const currentOperand = ref('')
const previousOperand = ref('')
const operation = ref('')
const shouldResetScreen = ref(false)

// 方法
function clear() {
  currentOperand.value = ''
  previousOperand.value = ''
  operation.value = ''
}

function deleteDigit() {
  currentOperand.value = currentOperand.value.toString().slice(0, -1)
}

function appendDigit(digit) {
  if (shouldResetScreen.value) {
    currentOperand.value = ''
    shouldResetScreen.value = false
  }

  if (digit === '.' && currentOperand.value.includes('.'))
    return
  currentOperand.value = currentOperand.value.toString() + digit.toString()
}

function appendOperation(op) {
  if (currentOperand.value === '')
    return

  if (previousOperand.value !== '') {
    calculate()
  }

  operation.value = op
  previousOperand.value = currentOperand.value
  shouldResetScreen.value = true
}

function calculate() {
  let computation
  const prev = Number.parseFloat(previousOperand.value)
  const current = Number.parseFloat(currentOperand.value)

  if (Number.isNaN(prev) || Number.isNaN(current))
    return

  switch (operation.value) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '×':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
    default:
      return
  }

  currentOperand.value = computation
  operation.value = ''
  previousOperand.value = ''
}

function calculateSquare() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current))
    return
  currentOperand.value = current ** 2
  shouldResetScreen.value = true
}

function calculateSquareRoot() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current) || current < 0)
    return
  currentOperand.value = Math.sqrt(current)
  shouldResetScreen.value = true
}

function toggleSign() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current))
    return
  currentOperand.value = current * -1
}

function calculatePercentage() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current))
    return
  currentOperand.value = current / 100
}

function calculateSin() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current))
    return
  currentOperand.value = Math.sin(current * Math.PI / 180) // 角度转弧度
}

function calculateCos() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current))
    return
  currentOperand.value = Math.cos(current * Math.PI / 180)
}

function calculateTan() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current))
    return
  currentOperand.value = Math.tan(current * Math.PI / 180)
}

function calculateLog() {
  const current = Number.parseFloat(currentOperand.value)
  if (Number.isNaN(current) || current <= 0)
    return
  currentOperand.value = Math.log10(current)
}
</script>

<template>
  <div class="calculator-container">
    <div class="display">
      <div class="previous-operand">
        {{ previousOperand }} {{ operation }}
      </div>
      <div class="current-operand">
        {{ currentOperand || '0' }}
      </div>
    </div>
    <div class="buttons-grid">
      <!-- 功能按钮 -->
      <button class="span-two function-btn" @click="clear">
        AC
      </button>
      <button class="function-btn" @click="deleteDigit">
        DEL
      </button>
      <button class="operation-btn" @click="appendOperation('÷')">
        ÷
      </button>

      <!-- 数字和基础运算符 -->
      <button @click="appendDigit('7')">
        7
      </button>
      <button @click="appendDigit('8')">
        8
      </button>
      <button @click="appendDigit('9')">
        9
      </button>
      <button class="operation-btn" @click="appendOperation('×')">
        ×
      </button>

      <button @click="appendDigit('4')">
        4
      </button>
      <button @click="appendDigit('5')">
        5
      </button>
      <button @click="appendDigit('6')">
        6
      </button>
      <button class="operation-btn" @click="appendOperation('-')">
        -
      </button>

      <button @click="appendDigit('1')">
        1
      </button>
      <button @click="appendDigit('2')">
        2
      </button>
      <button @click="appendDigit('3')">
        3
      </button>
      <button class="operation-btn" @click="appendOperation('+')">
        +
      </button>

      <button @click="appendDigit('0')">
        0
      </button>
      <button @click="appendDigit('.')">
        .
      </button>
      <button class="span-two equals-btn" @click="calculate">
        =
      </button>

      <!-- 高级功能区域 -->
      <div class="advanced-functions">
        <button class="advanced-btn" @click="calculateSquare">
          x²
        </button>
        <button class="advanced-btn" @click="calculateSquareRoot">
          √x
        </button>
        <button class="advanced-btn" @click="toggleSign">
          ±
        </button>
        <button class="advanced-btn" @click="calculatePercentage">
          %
        </button>
        <button class="advanced-btn" @click="calculateSin">
          sin
        </button>
        <button class="advanced-btn" @click="calculateCos">
          cos
        </button>
        <button class="advanced-btn" @click="calculateTan">
          tan
        </button>
        <button class="advanced-btn" @click="calculateLog">
          log
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .calculator-container {
  width: 400px;
  margin: 0 auto;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.display {
  background-color: #111;
  color: white;
  padding: 15px;
  border-radius: 5px;
  text-align: right;
  margin-bottom: 20px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
}

.previous-operand {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  min-height: 24px;
}

.current-operand {
  font-size: 2rem;
  font-weight: bold;
  min-height: 40px;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 15px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #333;
  color: white;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #444;
}

.span-two {
  grid-column: span 2;
}

.function-btn {
  background-color: #555;
}

.operation-btn {
  background-color: #444;
}

.equals-btn {
  background-color: #666;
}

.advanced-functions {
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.advanced-btn {
  background-color: #2a2a2a;
  font-size: 1rem;
}
</style>
