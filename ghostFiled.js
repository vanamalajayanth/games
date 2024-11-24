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
  console.log("Description :");
  console.log("There are ghosts in the field. they may keep on changing the positions");
  console.log("▶ to win the game player should go from the end to the start");
  console.log("▶ if the ghost is infront of you u can choose any other way except the way in which the ghost is in.");
  console.log("▶ complete the game in very less moves.");
  console.log("▶ '🦸‍♂️'  indicates current position");
  console.log("▶ '🔲'  indicates previous position");
  console.log("▶ '👻'  indicates ghost filed position which you have stepped on");
  console.log("▶ '⬛️'  indicates field");
  prompt("press any key");
  console.clear();
  const mode = +prompt("select mode :\n press 1 ➡️  easy \n press 2 ➡️  hard \n press any key to exit");
  return mode;
}

function getFiledString(string) {
  return '🔴end' + string + "⬅️ start";
}

function printBoard() {
  let string = '';
  for (let rowindex = 0; rowindex < number; rowindex++) {
    for (let columnIndex = 0; columnIndex < number; columnIndex++) {
      string += "⬛️";
    }
    if (rowindex === number - 1) {
      return getFiledString(string);
    }
    string += "\n     ";
  }
}

function isPositionMatching(row, column, position) {
  return row * number + column === position;
}

function failedMove(playerPosition, ghostPosition) {
  let string = '';
  for (let rowIndex = number - 1; rowIndex >= 0; rowIndex--) {
    for (let columnIndex = number; columnIndex >= 1; columnIndex--) {
      if (isPositionMatching(rowIndex, columnIndex, ghostPosition)) {
        string += '👻';
        continue;
      }
      string += isPositionMatching(rowIndex, columnIndex, playerPosition) ? '🦸‍♂️' : '⬛️';
    }

    if (rowIndex === 0) {
      return getFiledString(string);
    }

    string += "\n     ";
  }
}

function successMove(previousPosition, playerPosition) {
  let string = '🔴end';
  for (let rowIndex = number - 1; rowIndex >= 0; rowIndex--) {
    for (let columnIndex = number; columnIndex >= 1; columnIndex--) {
      if (isPositionMatching(rowIndex, columnIndex, playerPosition)) {
        string += '🦸‍♂️';
        continue;
      }
      string += isPositionMatching(rowIndex, columnIndex, previousPosition) ? '🔲️' : '⬛️';
    }
    string += rowIndex === 0 ? "⬅️ start" : "\n     ";
  }
  return string;
}

function getRandomNumber() {
  return Math.round(Math.random() * 100);
}

function getRandomInFour(position) {
  switch (getRandomNumber() % 4) {
    case 0:
      return position + 1;
    case 1:
      return position + number;
    case 2:
      return position - number;
    case 3:
      return position - 1;
  }
}

function getRandomValidMove(position) {
  if (position === number * number - 1 || position === number * number - number) {
    return 0;
  }
  return getRandomInFour(position);
}

function getValidDirection() {
  let direction = prompt("A : left \n D : right\n W : up\n S : down");


  while (!(direction === 'a' || direction === 'd' || direction === 'w' || direction === 's')) {
    direction = prompt("invalid direction. Enter again");
  }

  return direction;
}

function isMoveValid(position, direction) {
  if (direction === 'a') {
    return position % number !== 0;
  }
  if (direction === 'd') {
    return position % number !== 1;
  }
  if (direction === 'w') {
    return position <= number * number - number;
  }
  if (direction === 's') {
    return position > number;
  }
}

function getNextPosition(position, direction) {
  switch (direction) {
    case 'a':
      return position + 1;
    case 'd':
      return position - 1;
    case 'w':
      return position + number;
    case 's':
      return position - number;
  }
}

function isSafeMove(position, ghostPosition) {
  return position !== ghostPosition;
}

function MessageAfterFailedMove(position, nextPosition) {
  console.clear();
  console.log(failedMove(position, nextPosition));
  console.log("you have stepped on the ghost filed . you have brought back to the previous location");
}

function MessageAfterSuccessfulMove(position, nextPosition) {
  console.clear();
  console.log(successMove(position, nextPosition));
}

function isSafeMoveHardMode(position, ghostPosition1, ghostPosition2) {
  return position !== ghostPosition1 && position !== ghostPosition2;
}

function runHardMode(position, noOfMoves, ghostPosition1, ghostPosition2) {

  if (position === number * number) {
    return noOfMoves;
  }

  let direction = getValidDirection();

  while (!isMoveValid(position, direction)) {
    console.log("can't go out of the field . select another direction");
    direction = getValidDirection();
  }

  const nextPosition = getNextPosition(position, direction);

  if (isSafeMoveHardMode(nextPosition, ghostPosition1, ghostPosition2)) {
    console.clear();
    console.log(successMove(position, nextPosition));

    return runHardMode(nextPosition, noOfMoves + 1, getRandomValidMove(nextPosition), getRandomValidMove(nextPosition));
  }

  console.clear();
  console.log(failedMove(position, nextPosition));

  return runHardMode(position, noOfMoves + 1, ghostPosition1, ghostPosition2)
}

function runEasyMode(position, noOfMoves, ghostPosition) {

  if (position === number * number) {
    return noOfMoves;
  }

  let direction = getValidDirection();

  while (!isMoveValid(position, direction)) {
    console.log("can't go out of the field . select another direction");
    direction = getValidDirection();
  }

  const nextPosition = getNextPosition(position, direction);

  if (isSafeMove(nextPosition, ghostPosition)) {
    console.clear();
    console.log(successMove(position, nextPosition));

    return runEasyMode(nextPosition, noOfMoves + 1, getRandomValidMove(nextPosition));
  }

  console.clear();
  console.log(failedMove(position, ghostPosition));

  return runEasyMode(position, noOfMoves + 1, ghostPosition)
}

function startMode() {
  if (mode === 1) {
    console.log("you have completed the easy mode ghost game in ", runEasyMode(1, 0, getRandomValidMove(1)), ' moves');
  }
  if (mode === 2) {
    console.log("you have completed the hard mode game in ", runHardMode(1, 0, getRandomValidMove(1), getRandomValidMove(1)), " moves");
  }
}

let number = 0;
const mode = getDescription();

function play() {
  console.log("lets start the game");
  if (mode === 1 || mode === 2) {
    while (!(number > 0 && number < 21)) {
      console.clear();
      number = +prompt("enter grid size from 1 to 20");
    }

    console.clear();
    console.log(printBoard());
    startMode();
  }
  console.log(getCash(mode));
}

play();
