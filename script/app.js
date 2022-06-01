const player1 = prompt("Player One: Enter Your Name, you will be Rlue");
const player1Color = 'rgb(86, 151, 255)';

const player2 = prompt("Player Two: Enter Your Name, you will be Red");
const player2Color = 'rgb(237, 45, 73)';

let gameOn = true;
let table = $('table tr');
const greyColor = 'rgb(128, 128, 128)'

function reportWin(rowNum, colNum) {
  console.log("You won starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIdx, colIdx, color) {
  console.log(color);
  return table.eq(rowIdx).find('td').eq(colIdx).find('button').css('background-color', color)
}

function returnColor(rowIdx, colIdx) {
  return table.eq(rowIdx).find('td').eq(colIdx).find('button').css('background-color');
}

function checkBottom(colIdx) {
  let colorReport = returnColor(5, colIdx);
  for (let row = 5; row > -1; row--)  {
    colorReport = returnColor(row, colIdx);
    if (colorReport === greyColor) {
      return row
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== greyColor && one !== undefined);
}


//CHeck for Horizontal win
function horizontalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row, col);
        $('.board button').attr('disabled', 'true')
        return true;
      } else {
        continue
      }
    }
  }
}

//Check for Vertical WIns
function verticalWinCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row, col);
        $('.board button').attr('disabled', 'true')
        return true;
      } else {
        continue
      }
    }
  }
}


//Check for diagonal wins
function diagonalWinCheck() {
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row, col);
        $('.board button').attr('disabled', 'true')
        return true;
      } else if (colorMatchCheck(returnColor(row, col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row, col);
        $('.board button').attr('disabled', 'true')
        return true;
      } else {
        continue
      }
    }
  }
}


let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$('h3').text(player1 + " it is your turn, pick a column to drop in!")

$('.board button').on('click', function () {
  let col = $(this).closest('td').index();

  let bottomAvail = checkBottom(col);

  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName + " You have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + " it is your turn");
    currentColor = player1Color
  } else {
    currentName = player2;
    $('h3').text(currentName + " it is your turn");
    currentColor = player2Color
  }
})

$('#btn').on('click', () => {
  $('.board button').css('background-color', greyColor);
  window.location.reload()
})