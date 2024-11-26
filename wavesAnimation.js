const waveLength = 0.1 * prompt("enter wavelength");
const amplitude = +prompt("enter amplitude");

function getMinimum(number1, number2) {
  return number2 < number1 ? number2 : number1;
}

function getSinValue(number) {
  return Math.ceil(Math.sin(number * waveLength) * amplitude) + 45;
}

function delay(time) {
  for (let i = 0; i < time * 2000000; i++) {
  }
}

function repeat(string, times) {
  let resultString = '';
  for (let i = 0; i < times; i++) {
    resultString += string;
  }

  return resultString;
}

function extractDnaBasePair(point1, point2) {
  const spaces = repeat(' ', getMinimum(point1, point2));
  const leftPoint = spaces.length === point1 ? "🔸" : '⬥';
  const middlePart = repeat(' ', Math.abs(point2 - point1) - 1);
  const rightpoint = leftPoint === '🔸' ? '⬥' : '🔸';

  return spaces + leftPoint + '\n' + spaces + middlePart + '  ' + rightpoint;
}

function printDna() {
  for (let i = 0; i < 1000; i++) {
    delay(40);
    console.log(extractDnaBasePair(getSinValue(-i), getSinValue(i)));
  }
}

printDna();

