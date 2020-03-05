const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//Gets input from input field
function getUserInput() {
    return +userInput.value;
}

//Generate and write calculation log and description
function createAndWriteOutput(operator, resultBeforeCal, calNumber) {
    const calDescription = `${resultBeforeCal} ${operator} ${calNumber}`;
    outputResult(currentResult, calDescription); //From vendor file
}

function writeToLog(
    operation,
    preResult,
    number,
    result
) {
    const logEntry = {
        operation: operation,
        preResult: preResult,
        number: number,
        result: result
    };
    logEntries.push(logEntry);
    console.log(logEntry.operation);
    console.log(logEntries);
}

function add() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;
    createAndWriteOutput('+', initialResult, enteredNumber);
    writeToLog('ADD', initialResult, enteredNumber, currentResult);
}

function sub() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    createAndWriteOutput('-', initialResult, enteredNumber);
    writeToLog('SUBTRACTION', initialResult, enteredNumber, currentResult);
}

function mul() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    createAndWriteOutput('*', initialResult, enteredNumber);
    writeToLog('MULTIPLICATION', initialResult, enteredNumber, currentResult);
}

function div() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    createAndWriteOutput('/', initialResult, enteredNumber);
    writeToLog('DIVISION', initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', sub);
multiplyBtn.addEventListener('click', mul);
divideBtn.addEventListener('click', div);
