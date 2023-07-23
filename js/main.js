let runningTotal = 0;
let buffer = "0";
let previousOperator;

let historyItemOperation = null;
let historyItemSolution = "= ";

const screen = document.querySelector('.calc__screen');
const historyList = document.querySelector('.history__list');

function buttonClick(value) {
    if (isNaN(value) || value === "") {
        handleSymbol(value);

    } else {
        handleNumber(value);
    }
    console.log(`historyItemOperation = ${historyItemOperation} \n historyItemSolution = ${historyItemSolution}`);

    screen.innerText = buffer;

    screen.scroll(1000, 0);

    if (historyItemOperation !== null && historyItemSolution !== "= ") {
        historyList.insertAdjacentHTML('afterbegin', `<li class="history__item">
        <div class="history__delete"></div>
        <div class="history__content">
            <div title="${historyItemOperation}" class="history__operaion-text">${historyItemOperation}</div>
            <div title="${historyItemSolution}" class="history__answer-text">${historyItemSolution}</div>
        </div>
    </li>`)

        historyItemOperation = null;
        historyItemSolution = "= ";
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            historyItemOperation = null;
            break;
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;

            historyItemOperation += buffer;
            buffer = String(runningTotal);

            historyItemSolution += runningTotal;
            runningTotal = 0;
            break;
        case '<':
            if (buffer.length === 1) {
                buffer = '0';
                historyItemOperation = null;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
                historyItemOperation
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '%':
        case '√':
        case 'x²':
            if (buffer === '0') {
                return;
            }
            if (historyItemOperation === null) {
                historyItemOperation = buffer;
            } else {
                historyItemOperation += buffer;
            }
            handleMathWithOneNumber(symbol);
            previousOperator = null;
            buffer = String(runningTotal);
            historyItemSolution += runningTotal;
            runningTotal = 0;
            break;
    }
}

function handleMathWithOneNumber(symbol) {
    previousOperator = symbol;
    if (previousOperator === '%') {
        historyItemOperation += previousOperator;
        runningTotal = parseFloat(buffer) / 100;
    }
    if (previousOperator === '√') {
        historyItemOperation = previousOperator + historyItemOperation;
        runningTotal = Math.sqrt(parseFloat(buffer));
    }
    if (previousOperator === 'x²') {
        historyItemOperation = historyItemOperation + '²';
        runningTotal = parseFloat(buffer) * parseFloat(buffer);
    }
}

function handleMath(symbol) {
    if (buffer === '0' || (buffer === '0' && runningTotal === 0)) {

        previousOperator = symbol;
        return;
    }

    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    console.log(buffer);
    console.log(previousOperator);

    if (historyItemOperation === null) {
        historyItemOperation = buffer;
    } else {
        historyItemOperation += buffer;
    }

    buffer = '0';
}

function flushOperation(intBuffer) {
    historyItemOperation += previousOperator;
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc__buttons').addEventListener('click', function (event) {
        if (event.target.classList.contains('calc__side-buttons_arrow') || event.target.classList.contains('history__side-buttons_arrow')) {
            event.target.parentNode.classList.toggle('active');
        } else {
            buttonClick(event.target.innerText);
        }
    })
    document.querySelector('.calc__history').addEventListener('click', function (event) {
        if (event.target.classList.contains('history__side-buttons_arrow')) {
            event.target.parentNode.classList.toggle('active');
        }
    })
}

init();