function getCash(mode) {
  prompt("press enter to get your grand prize");
  switch (mode) {
    case 1:
      return Math.round(Math.random() * 100);
    case 2:
      return Math.round(Math.random() * 10000);
    case 3:
      return Math.round(Math.random() * 10000000);
  }
}

function getDescription() {
  console.log("welcome to mine game.");
  console.log("Rules.");
  console.log("▶ to win the game player should go from the end to the start");
  console.log("▶ for every successful move bombs position may change");
  console.log("▶ if you step on the bomb you will be gotten back to the previous position");
  console.log("▶ bomb positions does not changes if you step on the bomb");
  console.log("▶ '🟩'  indicates current position");
  console.log("▶ '⬜️'  indicates previous position");
  console.log("▶ '🟥'  indicates bomb position which you have stepped on");
  console.log("▶ '🟦'  indicates field");
  prompt("press any key");
  console.clear();
  const mode = +prompt("select mode :\n press 1 ➡️  easy \n press 2 ➡️  hard \n press 3 ➡️  extreme hard");
  console.log("lets start the game");
  return mode;
}

function printBoard() {
  let string = '';
  string += 'end';
  for (let counter1 = 0; counter1 < 5; counter1++) {
    for (let counter2 = 0; counter2 < 5; counter2++) {
      const condition = counter1 === 4 && counter2 === 4;

      string += condition ? "🟦  ⬅️ start" : "🟦 ";
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
        string += (counter1 * 5) + counter2 === position ? '🟩 ' : '🟦 ';
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

function setRandomMove(position) {
  if (position === 20 || position === 24) {
    return 25;
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
    return getRandomNumber() % 2 === 0 ? position + 1 : position + 5;
  }

  if (position % 5 === 0) {
    return getRandomNumber() % 2 === 0 ? position - 1 : position + 5;
  }

  if (position > 20) {
    return getRandomNumber() % 2 === 0 ? position - 5 : position + 1;
  }

  switch (getRandomNumber() % 4) {
    case 0:
      return position + 1;
    case 1:
      return position + 5;
    case 2:
      return position - 1;
    case 3:
      return position - 5;
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

function isSafeMove(position, bombPosition) {
  return position === bombPosition;
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
  console.log("younhave stepped on the bomb got you back to the previous location");
}

function MessageAfterSuccessfulMove(position, nextPosition) {
  console.clear();
  console.log(successMove(position, nextPosition));
}

function runExtremeHardMode(position, noOfMoves, pathHasNoBomb) {
  if (position === 25) {
    return noOfMoves;
  }

  const direction = checkAndGetValidDiection(0, position);
  let nextPosition = getNextPosition(position, direction);

  if (!isSafeMove(nextPosition, pathHasNoBomb)) {
    MessageAfterFailedMove(position, nextPosition);

    return runExtremeHardMode(position, noOfMoves + 1, pathHasNoBomb);
  }

  MessageAfterSuccessfulMove(position, nextPosition);

  return runExtremeHardMode(nextPosition, noOfMoves + 1, setRandomMove(nextPosition));
}

function runHardMode(position, noOfMoves, pathHasNoBomb1, pathHasNoBomb2) {
  if (position === 25) {
    return noOfMoves;
  }

  const direction = checkAndGetValidDiection(0, position);
  let nextPosition = getNextPosition(position, direction);

  if (!isSafeMove(nextPosition, pathHasNoBomb1) && !isSafeMove(nextPosition, pathHasNoBomb2)) {
    MessageAfterFailedMove(position, nextPosition);

    return runExtremeHardMode(position, noOfMoves + 1, pathHasNoBomb1);
  }

  MessageAfterSuccessfulMove(position, nextPosition);

  return runHardMode(nextPosition, noOfMoves + 1, setRandomMove(nextPosition), setRandomMove(nextPosition));
}

function runEasyMode(position, noOfMoves, pathHasBomb) {
  let mine = pathHasBomb;
  if (position === 25) {
    return noOfMoves;
  }
  if (position === 24 || position === 20) {
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
  const mode = getDescription();
  switch (mode) {
    case 1:
      console.clear();
      console.log(printBoard());
      console.log("yay... you have completd the game in ", runEasyMode(1, 0, setRandomMove(1)), "moves");
      console.log(getCash(mode));
      break;

    case 2:
      console.clear();
      console.log(printBoard());
      console.log("yay... you have completd the game in ", runHardMode(1, 0, setRandomMove(1), setRandomMove(1)), "moves");
      console.log(getCash(mode));
      break;

    case 3:
      console.clear();
      console.log(printBoard());
      console.log("yay... you have completd the game in ", runExtremeHardMode(1, 0, setRandomMove(1)), "moves");
      console.log(getCash(mode));
      break;
    default:
      getDescription();
  }
}
play();
