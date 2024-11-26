// ┏ ━ ┓

// ┃   ┃

// ┗ ━ ┛

const diceSize = +prompt("enter size of the dice only 8 or 10");


function repeat(string, times) {
  let resultString = '';

  for (let i = 0; i < times; i++) {
    resultString += string;
  }

  return resultString;
}

function getBorder(diceSize, leftEdge, rigthEdge) {
  return leftEdge + repeat("━", diceSize - 2) + rigthEdge;
}

function getDotsAndSpaces(diceSize, dots) {
  switch (dots) {
    case 0:
      return repeat(" ", diceSize - 2);
    case 1:
      return repeat(" ", diceSize / 2 - 2) + '🟢' + repeat(" ", diceSize / 2 - 2);
    case 2:
      return '🟢' + repeat(' ', diceSize - 6) + '🟢';
  }
}

function getDiceFace(diceSize, part1dots, part2dots, part3dots) {
  let string = getBorder(diceSize, '┏', '┓') + '\n';
  string += '┃' + getDotsAndSpaces(diceSize, part1dots) + '┃' + '\n';
  string += '┃' + getDotsAndSpaces(diceSize, part2dots) + '┃' + '\n';
  string += '┃' + getDotsAndSpaces(diceSize, part3dots) + '┃' + '\n';

  return string + getBorder(diceSize, '┗', '┛');
}

function getFace1(diceSize) {
  return getDiceFace(diceSize, 0, 1, 0);
}

function getFace2(diceSize) {
  return getDiceFace(diceSize, 1, 0, 1);
}

function getFace3(diceSize) {
  return getDiceFace(diceSize, 1, 1, 1);
}

function getFace4(diceSize) {
  return getDiceFace(diceSize, 2, 0, 2);
}

function getFace5(diceSize) {
  return getDiceFace(diceSize, 2, 1, 2);
}

function getFace6(diceSize) {
  return getDiceFace(diceSize, 2, 2, 2);

}

if (diceSize === 8 || diceSize === 10) {
  console.log(getFace1(diceSize));
  console.log(getFace2(diceSize));
  console.log(getFace3(diceSize));
  console.log(getFace4(diceSize));
  console.log(getFace5(diceSize));
  console.log(getFace6(diceSize));
} else {
  console.log("can't make a dice with that size");
}
