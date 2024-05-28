document.addEventListener('DOMContentLoaded', function () {
    const buttons = [
        'C', '←', '.', '×',
        '7', '8', '9', '÷',
        '4', '5', '6', '−',
        '1', '2', '3', '+',
        '0', '00', '='
    ];

    const operators = ['+', '−', '×', '÷'];

    let display = document.getElementById('display');
    let buttonsContainer = document.getElementById('buttons');

    buttons.forEach(button => {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = button;
        buttonElement.classList.add('button');
        if (operators.includes(button) || button === '=') {
            buttonElement.classList.add('operator');
        }
        if (button === '=') {
            buttonElement.classList.add('equals');
        }
        buttonsContainer.appendChild(buttonElement);
    });

    let currentInput = '';
    let lastInput = '';

    buttonsContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            let value = event.target.innerText;

            if (value === 'C') {
                currentInput = '';
                lastInput = '';
            } else if (value === '←') {
                currentInput = currentInput.slice(0, -1);
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
                } catch {
                    currentInput = 'Error';
                }
            } else {
                if (currentInput === 'Error') {
                    currentInput = '';
                }
                currentInput += value;
            }

            display.innerText = currentInput;
        }
    });

    document.addEventListener('keydown', function (event) {
        if (!/\d/.test(event.key) && !operators.includes(event.key) && event.key !== 'Enter' && event.key !== 'Backspace' && event.key !== '.') {
            alert('Only numbers are allowed');
            event.preventDefault();
        }
    });
});
