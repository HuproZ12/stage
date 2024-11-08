document.addEventListener('DOMContentLoaded', () => {
    const resultat = document.getElementById('resultat');
    const buttons = document.querySelectorAll('.clavier');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                clear();
            } else if (value === '±') {
                toggleSign();
            } else if (value === '%') {
                calculatePercentage();
            } else if (value === '÷' || value === 'x' || value === '-' || value === '+') {
                handleOperator(value);
            } else if (value === '=') {
                calculateResult();
            } else if (value === ',') {
                addDecimal();
            } else {
                addNumber(value);
            }
        });
    });

    function clear() {
        currentInput = '';
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    function toggleSign() {
        currentInput = (currentInput.charAt(0) === '-' ? currentInput.slice(1) : `-${currentInput}`);
        updateDisplay();
    }

    function calculatePercentage() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') calculateResult();
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculateResult() {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (operator) {
            case '÷':
                result = prev / curr;
                break;
            case 'x':
                result = prev * curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '+':
                result = prev + curr;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    function addDecimal() {
        if (currentInput.includes('.')) return;
        currentInput += '.';
        updateDisplay();
    }

    function addNumber(number) {
        currentInput += number;
        updateDisplay();
    }

    function updateDisplay() {
        resultat.textContent = currentInput;
    }

    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});
