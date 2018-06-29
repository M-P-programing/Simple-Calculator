 	displayNum = "";
    storedNum = "";
    operation = 0;
    queuedOperation = 0;
    calculationFinished = false;


function clearDisplay() {
    // Select the calculator's display
    var display = document.getElementById("calculator_result");

    // Clear the global variables and the display
    displayNum = "";
    storedNum = "";
    operation = 0;
    queuedOperation = 0;        
    display.value = displayNum;

}


function addNumber(digit){
	var display = document.getElementById('calculator_result');
	if ((display.value == "") && digit == "0") {
    // If it is, do nothing
      return;
    }
	else if (calculationFinished == true) {
        display.value = digit;
        calculationFinished = false;
    }
    // if neither of these is the case input the numbers as usual
    else {
      display.value += digit;
    }

}

function setOperation(command) {
    // Select the calculator's display
    var display = document.getElementById("calculator_result"),
            displayNum = display.value;
    // eval both the numbers to remove quotes
    // otherwise 4 + 5 will be "4" + "5" which in JS will equal 45
            evalDisplay = eval(displayNum),
            evalStored = eval(storedNum);

    // Check if there is a queued operation
    // If there is a queued operation calculate it
    // Then set the stored number to total of the calculation       
    if (queuedOperation == 0) {
        storedNum = display.value;
    }
    else if (queuedOperation == 1) {
        storedNum = evalStored + evalDisplay;
    }
    else if (queuedOperation == 2) {
        storedNum = evalStored - evalDisplay;
    }
    else if (queuedOperation == 3) {
        storedNum = evalStored * evalDisplay;
    }
    else if (queuedOperation == 4) {
        storedNum = evalStored / evalDisplay;
    }

    // Check what command was put into the calculator
    // Then set the operation to the correct number
    if (command == 'add') {
        operation = 1;
    }
    else if (command == 'subtract') {
        operation = 2;
    }
    if (command == 'multiply') {
        operation = 3;
    }
    else if (command == 'divide') {
        operation = 4;
    }

    // Queue up an operation for enterint multiple  commands without hitting equals
    // i.e. 10x4+8-9+3=
    queuedOperation = operation;
    // Clear the display in order to receive a new number
    display.value = '';
}

function calculate() {
    // Select the calculator's display
    var display = document.getElementById("calculator_result");
            displayNum = display.value;
    var evalDisplay = eval(displayNum),
            evalStored = eval(storedNum);

    // Do the math
    if (operation == 1) {
        displayNum = evalStored + evalDisplay;
    }
    else if (operation == 2) {
        displayNum = evalStored - evalDisplay;
    }
    else if (operation == 3) {
        displayNum = evalStored * evalDisplay;
    }
    // Change display to the answer
    display.value = displayNum;
    if (operation != 0)
        calculationFinished = true;
    // Clear all the global variables
    // Necessary in case the user wants to make a calculation using the answer
    operation = 0;
    queuedOperation = 0;
    displayNum = "";
    storedNum = "";
}