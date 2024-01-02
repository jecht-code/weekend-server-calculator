console.log('client.js is sourced!');
let operator;

function setOperator(event){
    event.preventDefault();
    // console.log(event);
    operator = event.target.firstChild.data;
    console.log('Grab for my newCalculation', operator);
}