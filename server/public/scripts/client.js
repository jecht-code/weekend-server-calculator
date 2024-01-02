console.log('client.js is sourced!');
let operator;

function setOperator(event){
    event.preventDefault();
    // console.log(event);
    operator = event.target.firstChild.data;
    console.log('Grab for my newCalculation', operator);
}

function onReady() {
    //Get existing data from server
    getCalculations();
}

//call function..
onReady();

//get existing calc and render it on the DOM.
function getCalculations() {
    console.log('Getting calculations...');
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then(function (response) {
        console.log('Response data:', response.data);
        let calculationHistory = response.data;
        renderCalculations(calculationHistory);
    })
        .catch(function (error) {
        console.log('Error getting calculations', error);
        alert('Sorry. Something bad happened. Try again later.');
    });
}

function renderCalculations(calculationData) {
    console.log('rendering calculations to the DOM', calculationData);
      
    let recentResult = document.getElementById('recentResult');
    let resultHistory = document.getElementById('resultHistory');
     
    // loop through the array to display them
    for (let calculation of calculationData) {
    //logging how data is looping
    console.log(calculation);
    console.log(calculationData);
    console.log('first property of first object', calculation.numOne);
    // Append the History to the DOM in history output area
    resultHistory.innerHTML += `
        <li>
            ${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}
        </li>`;
    } 
    // Display recent results to the recent section
    if (calculationData.length > 0) {
    recentResult.innerHTML += `
    <p>${calculationData[calculationData.length - 1].result}</p>`;
    }
}