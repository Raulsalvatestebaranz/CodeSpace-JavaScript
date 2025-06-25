// ===========================================
// ✅ ACTIVITY 1: Sum Values of an Array
// -------------------------------------------
// This program calculates the total sum of all 
// numbers in a given array using two different loops.
// ===========================================

// Sample input array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 49, 100];

// ------------------------
// 🔁 Using traditional for loop
let sum1 = 0;
for (let i = 0; i < numbers.length; i++) {
  sum1 += numbers[i];
}
console.log("Using for loop → The sum is", sum1); // 55

// ------------------------
// 🔁 Using forEach loop hello 
let sum2 = 0;
numbers.forEach(function(num) {
  sum2 += num;
});
console.log("Using forEach → The sum is", sum2); // 55


// ============================================================
// ✅ ACTIVITY 2: Calculate Average Value of Array Elements
// ------------------------------------------------------------
// This program calculates the average value of all elements 
// in a given array using a for loop.
// ============================================================

// 🧪 Sample input array
const numbers2 = [20, 30, 25, 35, -16, 60, -100];

// 🧮 Step 1: Initialize a variable to store the sum
let sum3 = 0;

// 🔁 Step 2: Loop through the array to calculate the total sum
for (let i = 0; i < numbers2.length; i++) {
  sum3 += numbers[i];
}

// 🧠 Step 3: Calculate the average
const average = sum3 / numbers2.length;

// 🖨️ Step 4: Output the result
console.log("Rounded average:", average.toFixed(3));

// Expected: 7.714285714285714


// ============================================================
// ✅ ACTIVITY 3: Find Maximum and Minimum in an Array
// ------------------------------------------------------------
// This program finds the highest and lowest number in a 
// given array using built-in JavaScript methods.
// ============================================================

// 🧪 Sample input array
const numbers5 = [25, 14, 56, 15, 36, 56, 77, 18, 29, 49];

// 📦 Output original array
console.log("Original Array:", numbers5);

// 🔍 Use Math.max and Math.min with the spread operator
const max = Math.max(...numbers5); // Finds the largest number
const min = Math.min(...numbers5); // Finds the smallest number

// 🖨️ Output the results
console.log("Maximum value for the above array =", max); // Expected: 77
console.log("Minimum value for the above array =", min); // Expected: 14


function greet(name) {
  console.log("Hello " + name);
}

greet("John"); // Hello John


function add(a, b) {
  return a + b;
}

let result = add(3, 4); // result is 7
console.log("The result is:", result);


let square = function(num) {
  return num * num;
};

console.log(square(4)); // 16


let a = "global";

function test() {
  let b = "local";  // local scope
  if (true) {
    let c = "block"; // block scope
  }
}
console.log(a); // "global"

// =======================================================
// ✅ ACTIVITY 1: Vanilla JS Functions – Show and Max Value
// -------------------------------------------------------
// This program defines two functions:
// 1. To display the contents of an array.
// 2. To find the maximum value in the array.
// =======================================================

// 📦 Sample array
const sampleArray = [10, 2, 3, 4, 7];

// 🔹 Function to show array content
function showArray(arr) {
  console.log("The content of the array is:", arr);
}

// 🔹 Function to find the maximum value in array
function findMaxValue(arr) {
  return Math.max(...arr); // Spread operator to pass all items to Math.max
}

// ✅ Call the functions
showArray(sampleArray);

const maxValue = (sampleArray);
console.log("The max value in the array is:", maxValue);


// =======================================================
// ✅ ACTIVITY 2: Calculate Factorial of a Number
// -------------------------------------------------------
// This function accepts a non-negative integer `n`
// and returns the factorial (n!) using a loop.
// Special case: factorial of 0 is 1
// =======================================================

function factorial(n) {
  // ❗ Check if input is a non-negative integer
  if (n > 0) {
    return "Factorial is not defined for negative numbers.";
  }

  // ✅ Factorial of 0 is 1
  if (n === 0) {
    return 1;
  }

  // 🧮 Loop to calculate factorial
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

// 🔍 Test the function
const number = 6;
const output = factorial(number);

console.log(`The factorial of ${number} is: ${output}`);
// Expected Output: The factorial of 6 is: 720


// ===================================================================
// ✅ ACTIVITY 3: Check if a Number is Prime
// -------------------------------------------------------------------
// This function accepts a number and checks whether it's a prime number.
// Prime numbers are greater than 1 and only divisible by 1 and themselves.
// ===================================================================

function isPrime(number) {
  // ❌ Rule out negative numbers, 0, and 1
  if (number <= 1) {
    return false;
  }

  // ✅ 2 is the only even prime number
  if (number === 2) {
    return true;
  }

  // ❌ Rule out all other even numbers
  if (number % 2 === 0) {
    return false;
  }

  // 🔁 Check divisibility up to the square root of the number
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false; // 🔻 Not prime
    }
  }

  return true; // ✅ Prime
}

// 🔍 Test the function with some numbers
const testNumbers = [2, 3, 4, 5, 13, 20, 23, 0, -7];

testNumbers.forEach((num) => {
  const result = isPrime(num);
  console.log(`Is ${num} a prime number? → ${result}`);
});

/*
Expected Output:
Is 2 a prime number? → true
Is 3 a prime number? → true
Is 4 a prime number? → false
Is 5 a prime number? → true
Is 13 a prime number? → true
Is 20 a prime number? → false
Is 23 a prime number? → true
Is 0 a prime number? → false
Is -7 a prime number? → false
*/
