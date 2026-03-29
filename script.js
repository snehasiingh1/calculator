let current = '0';
let prev = '';
let operator = null;
let justEvaled = false;

const mainEl = document.getElementById('main');
const exprEl = document.getElementById('expr');

function update() {
mainEl.textContent = current;
}

function digit(d) {
if (justEvaled) {
    current = d;
    justEvaled = false;
} else {
    current = current === '0' ? d : current + d;
} update();
}

function dot() {
    if (justEvaled) {
    current = '0.';
    justEvaled = false;
    } else if (!current.includes('.')) {
    current += '.';
    }
    update();
}

function op(o) {
    if (operator && !justEvaled) compute();
    prev = current;
    operator = o;
    justEvaled = false;
    current = '0';
    const sym = o === '*' ? '×' : o === '/' ? '÷' : o;
    exprEl.textContent = prev + ' ' + sym;
}

function compute() {
    if (!operator || !prev) return;
    const a = parseFloat(prev);
    const b = parseFloat(current);
    let res;
    if (operator === '+') res = a + b;
    else if (operator === '-') res = a - b;
  else if (operator === '*') res = a * b;
    else if (operator === '/') res = b === 0 ? NaN : a / b;
    current = isNaN(res) ? 'Error' : String(parseFloat(res.toFixed(10)));
    operator = null;
    prev = '';
}

function equals() {
    const symMap = { '*': '×', '/': '÷', '+': '+', '-': '−' };
    exprEl.textContent = prev + ' ' + (symMap[operator] || '') + ' ' + current + ' =';
    compute();
    justEvaled = true;
    update();
}

function clear_() {
    current = '0';
    prev = '';
    operator = null;
    justEvaled = false;
    exprEl.textContent = '';
    update();
}

function toggleSign() {
    if (current !== '0' && current !== 'Error') {
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    update();
    }
}

function percent() {
    current = String(parseFloat(current) / 100);
    update();
}

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') digit(e.key);
    else if (e.key === '.') dot();
    else if (e.key === '+') op('+');
    else if (e.key === '-') op('-');
    else if (e.key === '*') op('*');
    else if (e.key === '/') { e.preventDefault(); op('/'); }
    else if (e.key === 'Enter' || e.key === '=') equals();
    else if (e.key === 'Escape') clear_();
    else if (e.key === 'Backspace') {
    if (current.length > 1) current = current.slice(0, -1);
    else current = '0';
    update();
    }
});