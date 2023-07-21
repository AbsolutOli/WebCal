let runningTotal = 0;
let buffer = "0";
let previousOperator;


const screen = document.querySelector('.calc__screen')


function buttonClick(value) {
    if (isNaN(value) || value === "") {
        console.log(`some sym ${value}`);
        handleSymbol(value);

    } else {
        console.log(`some num ${value}`);
        handleNumber(value);
    }
    console.log(`runningTotal = ${runningTotal} + ${typeof (buffer)} \n buffer = ${buffer} \n previousOperator = ${previousOperator}`);

    screen.innerText = buffer;

    screen.scroll(1000, 0);
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            runningTotal = 0;
            break;
        case '<':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                console.log(buffer);
                console.log(buffer.length);
                buffer = buffer.substring(0, buffer.length - 1);
                console.log(buffer);
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
            handleMathWithOneNumber(symbol);
            previousOperator = null;
            buffer = String(runningTotal);
            runningTotal = 0;
            break;
    }
}

function handleMathWithOneNumber(symbol) {
    previousOperator = symbol;
    if (previousOperator === '%') {
        runningTotal = parseFloat(buffer) / 100;
    }
    if (previousOperator === '√') {
        runningTotal = Math.sqrt(parseFloat(buffer));
    }
    if (previousOperator === 'x²') {
        runningTotal = parseInt(buffer) * parseInt(buffer);
    }
}

function handleMath(symbol) {
    if (buffer === '0' && runningTotal === 0) {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
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
        if (event.target.classList.contains('calc__side-buttons_arrow')) {
            event.target.parentNode.classList.toggle('active');
        } else {
            buttonClick(event.target.innerText);
            console.log(event);
        }
    })
}

init();