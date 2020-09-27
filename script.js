let numbers = document.querySelectorAll('[data-number]'),
    symbol = document.querySelectorAll('[data-operation]'),
    result = document.querySelector('[data-equals]'),
    clear = document.querySelector('[data-all-clear]'),
    del = document.querySelector('[data-delete]'),
    sqrt = document.querySelector('[data-square]'),
    prev = document.querySelector('[data-previous-operand]'),
    current = document.querySelector('[data-current-operand]'),
    decimal = document.querySelector('[data-decimal]'),
    choseSymbol = '',
    prevNum = 0,
    currentNum = 0,
    flag = true;


clear.addEventListener('click', () => ac())
del.addEventListener('click', () => deleteLast())
decimal.addEventListener('click', () => dots())
numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (flag) {
            if (current.innerHTML === '0' && button.innerHTML === '0') {
                return;
            } else {
                current.innerHTML += button.innerHTML
            }
        } else {
            flag = true
            current.innerHTML = '' + button.innerHTML
        }
    })
})

sqrt.addEventListener('click', () => sqr())

symbol.forEach(symbol => {
    symbol.addEventListener('click', () => {
        if (current.innerHTML === '' && symbol.innerHTML === '-') {
            current.innerHTML += symbol.innerHTML
        } else if (current.innerHTML === '' || current.innerHTML === '-') {
            return;
        } else if (choseSymbol === '') {
            chose(symbol.innerHTML)
        } else {
            res(choseSymbol)
            chose(symbol.innerHTML)
        }
    })
})

result.addEventListener('click', () => res(choseSymbol))

function chose(symbol) {
    flag = true
    choseSymbol = symbol //записывает символ
    prevNum = parseFloat(parseFloat(current.innerHTML).toFixed(15)) // записывает число
    prev.innerHTML = current.innerHTML + ' ' + symbol // переводит на новую строку
    current.innerHTML = ''// очищает поля ввода
    console.log(prevNum)

}

function sqr() {
    let s = Math.sqrt(parseFloat(current.innerHTML))
    if (isNaN(s)) {
        error()
    } else {
        current.innerHTML = s.toString()
        flag = false
    }
}

function res(symbol) {

    currentNum = parseFloat(parseFloat(current.innerHTML).toFixed(15))
    console.log(typeof currentNum, typeof prevNum)
    if (isNaN(prevNum) || isNaN(currentNum)) error();
    switch (symbol) {
        case '+':
            currentNum = prevNum + currentNum
            break;
        case '-':
            currentNum = prevNum - currentNum
            break;
        case '/':
            currentNum = prevNum / currentNum
            break;
        case '^':
            currentNum = prevNum ** currentNum
            break;
        case '*':
            currentNum = prevNum * currentNum
            break;
    }
    if (isNaN(currentNum)) {
        error()
    } else {
        flag = false
        choseSymbol = ''
        prevNum = 0
        prev.innerHTML = ''
        current.innerHTML = parseFloat(parseFloat(currentNum).toFixed(15)).toString()
    }

}

function ac() {
    choseSymbol = '';
    prevNum = 0;
    currentNum = 0;
    prev.innerHTML = '';
    current.innerHTML = '';
    flag = true;
}

function deleteLast() {
    if (current.innerHTML === '') {
        let y = prev.innerHTML.slice(0, -2)
        ac()
        current.innerHTML = y
    } else {
        current.innerHTML = current.innerHTML.slice(0, -1)
    }
}

function error() {

    ac()
    current.innerHTML = 'Error'
    flag = false
}

function dots() {
    if (current.innerHTML.indexOf('.') === -1 && !(current.innerHTML === '')) {
        current.innerHTML += '.';
    } else {
        return;
    }
}