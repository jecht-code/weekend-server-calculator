const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', function (req, res) {
  res.send(calculations);
})

// POST /calculations
app.post('/calculations', (req, res) => {
  //store data
  let dataContainer = req.body;
  //consolelog the container.
  console.log(dataContainer);
  let numOne = dataContainer.numOne;
  let numTwo = dataContainer.numTwo;
  let operator = dataContainer.operator;

  //verify these data
  console.log(numOne, numTwo, operator);

  //perform caluclations
  let result = calculateResults(Number(numOne), Number(numTwo), operator);

  //create object to push.
  let newCalculation = {
    numOne,
    numTwo,
    operator,
    result,
  };

  //Add data to list existing list
  calculations.push(newCalculation);

  //do magic
  res.sendStatus(201);
})

//create function to calulcate the calculator.
function calculateResults (numOne, numTwo, operator) {
  //addition
  if (operator === '+') {
    return numOne + numTwo;
    //subtract
  } else if (operator === '-') {
    return numOne - numTwo;
    //multiply
  } else if (operator === '*') {
    return numOne * numTwo;
    //divide
  } else if (operator === '/') {
    return numOne / numTwo
  }
}

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
