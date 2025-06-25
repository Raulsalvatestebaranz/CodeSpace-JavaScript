


// program to display text 5 times
const n = 5;
let message = "";

// looping from i = 1 to 5
for (let i = 1; i <= n; i++) {
  message += "I love JavaScript.<br>";
}

// display in the browser
document.getElementById("exercise-output-1").innerHTML = message;
document.getElementById("exercise-output-2").innerHTML = message;




// Activity 1 – Check odd/even from 0 to 15

// Create empty string to store messages
let result = "";

// Loop from 0 to 15
for (let i = 0; i <= 5; i += 3) {
  // Check if the number is even
  if (i % 2 === 0) {
    // If even, append message to result
    result += i + " is even<br>";
  } else {
    // If odd, append message to result
    result += i + " is odd<br>";
  }
}

// Display result inside the HTML element
document.getElementById("activity1-output").innerHTML = result;



document.getElementById("generate-btn").addEventListener("click", function () {
  const input = document.getElementById("table-input").value;
  const num = parseInt(input);

  // Check if input is a valid number
  if (isNaN(num)) {
    document.getElementById("activity2-output").innerHTML = "<span class='text-danger'>Please enter a valid number.</span>";
    return;
  }

  let table = "";

  for (let i = 1; i <= 10; i++) {
    table += `${num} x ${i} = ${num * i}<br>`;
  }

  document.getElementById("activity2-output").innerHTML = table;
});





