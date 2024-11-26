const LENGTH = 10;
const WIDTH = 50;

function extractStart(start) {
  return start < 0 ? 0 : start;
}

function extractEnd(text, end) {
  return end > text.length - 1 ? text.length - 1 : end;
}

function _slice(text, start, end) {
  if (start > end) {
    return '';
  }

  return text[start] + _slice(text, start + 1, end);
}

function slice(text, start, end) {
  return _slice(text, extractStart(start), extractEnd(text, end));
}

function printScreen() {
  let string = '';
  for (let i = 0; i < LENGTH * WIDTH; i++) {
    if (i % WIDTH === 0) {
      string += "\n";
    }
    string += ' ';
  }
  return string;
}

function StringMaker(string, x, y) {
  let resultString = '';
  resultString += slice(string, 0, (x - 1) * (WIDTH + 1) + y - 1);
  resultString += "ᯓ ✈︎" + slice(string, (x - 1) * (WIDTH + 1) + y + 1, string.length - 2);

  return resultString;
}

function getRandomNumberInRange(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function numbersInOrder(number) {
  return number + 1;
}

function delay(time) {
  for (let i = 0; i < time * 1000000; i++) {

  }
}

function animate(string, num1, num2) {
  console.clear();
  console.log(StringMaker(string, num1, num2));
  delay(100);
  if (num1 === LENGTH - 1) {
    return 0;
  }
  if (num2 === WIDTH) {
    return animate(printScreen(), numbersInOrder(num1), 1);
  }
  return animate(printScreen(), num1, numbersInOrder(num2));
}

animate(printScreen(), 1, 1);
