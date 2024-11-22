function getCash(mode) {
  prompt("press enter to get your grand prize");
  switch (mode) {
    case 1:
      return Math.round(Math.random() * 10000) + "rupess";
    case 2:
      return Math.round(Math.random() * 1000000) + "rupeesss";
    default:
      console.log("exitted");
  }
}

function getDescription() {
  console.log("welcome to ghost field game.");
  console.log("Rules.");
  console.log("▶ to win the game player should go from the end to the start");
  console.log("▶ only for every successful move ghosts position may change");
  console.log("▶ if you go in  to the ghost field  you will be gotten back to the previous position");
  console.log("▶ escape from the ghosts reach the end");
  console.log("▶ '🦸‍♂️'  indicates current position");
  console.log("▶ '🔲'  indicates previous position");
  console.log("▶ '👻'  indicates ghost position which you have stepped on");
  console.log("▶ '⬛️'  indicates field");
  prompt("press any key");
  console.clear();
  const mode = +prompt("select mode :\n press 1 ➡️  easy \n press 2 ➡️  hard"
  );
  console.log("lets start the game");
  return mode;
}

function printBoard() {
  let string = '🔴end';
  for (let rowindex = 0; rowindex < number; rowindex++) {
    for (let columnIndex = 0; columnIndex < number; columnIndex++) {
      string += "⬛️";
    }
    if (rowindex === number - 1) {
      return string + "⬅️ start";
    }
    string += "\n     ";
  }
}

function failedMove(position, nextPosition) {
  let string = '🔴end';
  for (let rowIndex = number - 1; rowIndex >= 0; rowIndex--) {
    for (let columnIndex = number; columnIndex >= 1; columnIndex--) {
      if ((rowIndex * number) + columnIndex === nextPosition) {
        string += '👻';
      } else {
        string += (rowIndex * number) + columnIndex === position ? '🦸‍♂️' : '⬛️';
      }
    }
    string += rowIndex === 0 ? "⬅️ start" : "\n     ";
  }
  return string;
}

function successMove(position, nextPosition) {
  let string = '🔴end';
  for (let rowIndex = number - 1; rowIndex >= 0; rowIndex--) {
    for (let columnIndex = number; columnIndex >= 1; columnIndex--) {
      if ((rowIndex * number) + columnIndex === nextPosition) {
        string += '🦸‍♂️';
      } else {
        string += (rowIndex * number) + columnIndex === position ? '🔲️' : '⬛️';
      }
    }
    string += rowIndex === 0 ? "⬅️ start" : "\n     ";
  }
  return string;
}

function getRandomNumber() {
  return Math.round(Math.random() * 100);
}

function setRandomMove(position) {
  if (position === number * number - 1 || position === number * number - number) {
    return number * number;
  }
  if (position === 1) {
    return getRandomNumber() % 2 === 0 ? position + 1 : position + number;
  }

  if (position === number * number - number + 1) {
    return getRandomNumber() % 2 === 0 ? position + 1 : position - number;
  }

  if (position === number) {
    return getRandomNumber() % 2 === 0 ? position + number : position - 1;
  }

  if (position < number) {
    switch (getRandomNumber() % 3) {
      case 0:
        return position - 1;
      case 1:
        return position + 1;
      case 2:
        return position + number;
    }
  }

  if (position % number === 1) {
    return getRandomNumber() % 2 === 0 ? position + 1 : position + number;
  }

  if (position % number === 0) {
    return getRandomNumber() % 2 === 0 ? position - 1 : position + number;
  }

  if (position > number * number - number) {
    return getRandomNumber() % 2 === 0 ? position - number : position + 1;
  }

  switch (getRandomNumber() % 4) {
    case 0:
      return position + 1;
    case 1:
      return position + number;
    case 2:
      return position - 1;
    case 3:
      return position - number;
  }
}

function isValidInput(direction) {
  return direction === 1 || direction === 2 || direction === 3 || direction === 4;
}

function isNextMoveValid(position, direction) {
  if (direction === 1) {
    return position % number === 0;
  }
  if (direction === 2) {
    return position % number === 1;
  }
  if (direction === 3) {
    return position > number * number - number;
  }
  if (direction === 4) {
    return position <= number;
  }
}

function getNextPosition(position, direction) {
  switch (direction) {
    case 1:
      return position + 1;
    case 2:
      return position - 1;
    case 3:
      return position + number;
    case 4:
      return position - number;
  }
}

function isSafeMove(position, ghostPosition) {
  return position === ghostPosition;
}

function checkAndGetValidDiection(direction, position) {
  if (isValidInput(direction) && !isNextMoveValid(position, direction)) {
    return direction;
  }
  console.log("Enter only valid and posiible directions");
  direction = +prompt("enter\n 1 : for left \n 2 : for right \n 3 : for up\n 4 : for down ");
  return checkAndGetValidDiection(direction, position);
}

function MessageAfterFailedMove(position, nextPosition) {
  console.clear();
  console.log(failedMove(position, nextPosition));
  console.log("you have stepped on the ghost got you back to the previous location");
}

function MessageAfterSuccessfulMove(position, nextPosition) {
  console.clear();
  console.log(successMove(position, nextPosition));
}

function runHardMode(position, noOfMoves, pathHasNoghost1, pathHasNoghost2) {
  if (position === number * number) {
    return noOfMoves;
  }

  const direction = checkAndGetValidDiection(0, position);
  let nextPosition = getNextPosition(position, direction);

  if (!isSafeMove(nextPosition, pathHasNoghost1) && !isSafeMove(nextPosition, pathHasNoghost2)) {
    MessageAfterFailedMove(position, nextPosition);

    return runHardMode(position, noOfMoves + 1, pathHasNoghost1);
  }

  MessageAfterSuccessfulMove(position, nextPosition);

  return runHardMode(nextPosition, noOfMoves + 1, setRandomMove(nextPosition), setRandomMove(nextPosition));
}

function runEasyMode(position, noOfMoves, pathHasghost) {
  let mine = pathHasghost;
  if (position === number * number) {
    return noOfMoves;
  }
  if (position === number * number - 1 || position === number * number - number) {
    mine = 0;
  }

  const direction = checkAndGetValidDiection(0, position);
  let nextPosition = getNextPosition(position, direction);


  if (isSafeMove(nextPosition, mine)) {
    MessageAfterFailedMove(position, nextPosition);

    return runEasyMode(position, noOfMoves + 1, mine);
  }
  MessageAfterSuccessfulMove(position, nextPosition);

  return runEasyMode(nextPosition, noOfMoves + 1, setRandomMove(nextPosition));
}

function play() {
  if (mode === 1) {
    console.log("you have completed the easy mode mine game in ", runEasyMode(1, 0, setRandomMove(1)), ' moves');
  }
  if (mode === 2) {
    console.log("you have completed the game in ", runHardMode(1, 0, setRandomMove(1), setRandomMove(1)), " moves");
  }
}

console.clear();
const mode = getDescription();
let number = 0;
if (mode === 1 || mode === 2) {
  number = +prompt("enter grid size");
  console.log(printBoard());
  play();
}
console.log(getCash(mode));
