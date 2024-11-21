function printBoard() {
  let string = '';
  string += 'end';
  for (let counter1 = 0; counter1 < 5; counter1++) {
    for (let counter2 = 0; counter2 < 5; counter2++) {
      const condition = counter1 === 4 && counter2 === 4;

      string += condition ? "🟩 ⬅️ start" : "🟦 ";
    }
    string += "\n";
    string += "   ";
  }

  return string;
}

function failedMove(position, nextPosition) {
  let string = '';
  string += 'end';
  for (let counter1 = 4; counter1 >= 0; counter1--) {
    for (let counter2 = 5; counter2 >= 1; counter2--) {
      if ((counter1 * 5) + counter2 === nextPosition) {
        string += '🟥 ';
      } else {
        string += (counter1 * 5) + counter2 === position ? '⬜️ ' : '🟦 ';
      }
    }
    string += counter1 === -1 ? "⬅️ start" : "\n   ";
  }
  return string;
}

function successMove(position, nextPosition) {
  let string = '';
  string += 'end';
  for (let counter1 = 4; counter1 >= 0; counter1--) {
    for (let counter2 = 5; counter2 >= 1; counter2--) {
      if ((counter1 * 5) + counter2 === nextPosition) {
        string += '🟩 ';
      } else {
        string += (counter1 * 5) + counter2 === position ? '⬜️ ' : '🟦 ';
      }
    }
    string += counter1 === -1 ? "⬅️ start" : "\n   ";
  }
  return string;
}

function getRandomNumber() {
  return Math.round(Math.random() * 100);
}

function setSafeMove(position) {
  if (position === 20 || position === 24) {
    return 0;
  }
  if (position === 1) {
    return getRandomNumber() % 2 === 0 ? position + 1 : position + 5;
  }

  if (position === 21) {
    return getRandomNumber() % 2 === 0 ? position + 1 : position - 5;
  }

  if (position === 5) {
    return getRandomNumber() % 2 === 0 ? position + 5 : position - 1;
  }

  if (position < 5) {
    switch (getRandomNumber() % 3) {
      case 0:
        return position - 1;
      case 1:
        return position + 1;
      case 2:
        return position + 5;
    }
  }

  if (position % 5 === 1) {
    switch (getRandomNumber() % 3) {
      case 0:
        return position - 5;
      case 1:
        return position + 1;
      case 2:
        return position + 5;
    }
  }

  if (position % 5 === 0) {
    switch (getRandomNumber() % 3) {
      case 0:
        return position - 5;
      case 1:
        return position - 1;
      case 2:
        return position + 5;
    }
  }

  if (position > 20) {
    switch (getRandomNumber() % 3) {
      case 0:
        return position - 5;
      case 1:
        return position - 1;
      case 2:
        return position + 1;
    }
  }

  switch (getRandomNumber() % 4) {
    case 0:
      return position - 5;
    case 1:
      return position - 1;
    case 2:
      return position + 5;
    case 3:
      return position + 1;
  }
}

function isValidInput(direction) {
  return direction === 1 || direction === 2 || direction === 3 || direction === 4;
}

function isNextMoveValid(position, direction) {
  if (direction === 1) {
    return position === 5 || position === 10 || position === 15 || position === 20 || position === 25;
  }
  if (direction === 2) {
    return position === 1 || position === 6 || position === 11 || position === 16 || position === 21;
  }
  if (direction === 3) {
    return position === 21 || position === 22 || position === 23 || position === 24 || position === 25;
  }
  if (direction === 4) {
    return position === 1 || position === 2 || position === 3 || position === 4 || position === 5;
  }
}

function getNextPosition(position, direction) {
  switch (direction) {
    case 1:
      return position + 1;
    case 2:
      return position - 1;
    case 3:
      return position + 5;
    case 4:
      return position - 5;
  }
}

function isSafeMoveNormalMode(position, bombPosition) {
  return position === bombPosition;
}

function runHard(position, noOfMoves, bombPosition) {
  console.log("current location", position);
  if (position === 25) {
    return noOfMoves;
  }

  let direction = +prompt("enter '1' for left . '2' for right. '3' for up.'4' for down ");

  while (!isValidInput(direction) || isNextMoveValid(position, direction)) {
    console.log("can't go in that direction. select any other direction");
    noOfMoves += 1;
    direction = +prompt("enter '1' for left . '2' for right. '3' for up. '4' for down ");
  }

  let nextPosition = getNextPosition(position, direction);
  const hasBombFound = isSafeMoveNormalMode(nextPosition, bombPosition);

  if (hasBombFound) {
    console.clear();
    console.log("younhave stepped on the bomb");
    console.log(failedMove(position, nextPosition));
    console.log("got you back to the previous location");
    console.log(successMove(position, position));
    return runHard(position, noOfMoves + 1, bombPosition);
  }
  console.clear();
  console.log(successMove(position, nextPosition));

  return runHard(nextPosition, noOfMoves + 1, setSafeMove(nextPosition));
}

function play() {
  console.log(printBoard());
  console.log("yay... you have completd the game in ", runHard(1, 0, setSafeMove(1)), "moves");
}

play();
