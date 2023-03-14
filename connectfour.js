// DOM Elements
const allCells = document.querySelectorAll('.cell:not(.row-top)');               // would be selected all cells but not cells that are on row-top (invisible ones)
const topCells = document.querySelectorAll('.cell.row-top');                     // row-top cells
const resetButton = document.querySelector('.reset');                            // button
const statusSpan = document.querySelector('.status');                             // status
const popupReset = document.querySelector('.popup-reset')

// columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];      // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];      // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];      // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];     // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];     // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];     // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];     // array that contains elements of the columns. The reason of starting the numbers of columns from the biggest to the smallest is that columns fill from bottom to the top. Therefore the highest number would have the smaller index.
const columns = [column0, column1, column2, column3, column4, column5, column6];                                      // array of the arrays that contains all columns


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];            // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right         
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];              // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right   
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];          // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right     
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];       // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];       // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];       // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];       // array that contains elements fo the rows. The reason of exponentially grow of rows is that they go from the left to the right
const rows = [row0, row1, row2, row3, row4, row5, topRow];                                                             // array of the arrays that contains all rows







// VARIABLES
let gameIsLive = true                                                                   // let because it can be false that shows that game is finished
let yellowIsNext = true                                                                 // let to show rather it is yellow's turn or red's turn. Boolean true shows rather it is turn of yellow or red
let redIsNext = true                                                                    // let to show rather it is yellow's turn or red's turn. Boolean true shows rather it is turn of yellow or red






// FUNCTION
function handleGameEnd() {
  if (!gameIsLive) {
    document.querySelector('.game-over').style.display = 'block'
  }
}


const getClassListArray = (cell) => {                                                  // declaring function that affects to class name of cells
    const classList = cell.classList
    return Array.from(classList)                                                       // classList was an object to better work we should transform it into an array. Spread element (...) spreads each elements of our array
}

const getCellLocation = (cell) => {
    const classList = getClassListArray(cell)
    const rowClass = classList.find(className  => className.includes('row'))           // searches for the class that has name of row using find method
    const colClass = classList.find(className  => className.includes('col'))           // searches for the class that has name of column using find method
    const rowIndex = rowClass[4]                                                       // selects just row and column in the form of a string. Like 4 6, 2 3. The reason of index being for is that row-x and col-y the fourth letter are numbers of row and columns                                       
    const colIndex = colClass[4]                                                       // selects just row and column in the form of a string. Like 4 6, 2 3. The reason of index being for is that row-x and col-y the fourth letter are numbers of row and columns 
    const rowNumber = parseInt(rowIndex, 10)                                           // converting 4th index of rowClass to numbers
    const colNumber = parseInt(colIndex, 10)                                           // converting 4th index of rowClass to numbers
    return [rowNumber, colNumber]                                                      // array with number of row and columns 
}

const getFirstOpenCellForColumn = (colIndex) => {
    const column = columns[colIndex]                                                   // array of the array of the columns 
    const columnWithoutTop = column.slice(0, 6)                                        // it will slice top column because we don't need it in  the game as regular cell

    for (cell of columnWithoutTop){
        const classList = getClassListArray(cell)
        if (!classList.includes('yellow') && !classList.includes('red')){            // checks rather class is empty
            return cell
        }
    }
    return null                                                                      // means all boxes were filled 
}

const clearColorFromTop = (colIndex) => {                                           // function that cleans topCell
    const topCell = topCells[colIndex]
    topCell.classList.remove('yellow')
    topCell.classList.remove('red')
}


const getColorOfCell = (cell) => {                                                   // function that checks for existence of color in the cell 
    const classList = getClassListArray(cell)
    if (classList.includes('yellow')) return 'yellow'
    if (classList.includes('red')) return 'red'
    return null
}






// important: logic for winning
const checkWinningCells = (cells) => {
    if (cells.length < 4) return false;                                           // length more that 4 means one side has won the match
  
    gameIsLive = false;
    for (const cell of cells) {
      cell.classList.add('win');                                                 // adds class win so that it would be         
    }
    statusSpan.style.backgroundColor = 'black' 
    statusSpan.style.padding = '10px 15px'
    statusSpan.style.borderRadius = '10px'
    statusSpan.style.transition = '0.5s'
    if (yellowIsNext){
      statusSpan.textContent = `Yellow has won!`
      statusSpan.style.color = 'yellow'
      statusSpan.style.border = '2px solid yellow'
    } else {
      statusSpan.textContent = `Red has won!`
      statusSpan.style.color = 'red'
      statusSpan.style.border = '2px solid red'
    }
    setTimeout(handleGameEnd, 1000);
    
  };

  const checkStatusOfGame = (cell) => {                                                 // logic for game
    const color = getColorOfCell(cell);
    if (!color) return;
    const [rowIndex, colIndex] = getCellLocation(cell);
  
    // Check horizontally
    let winningCells = [cell];
    let rowToCheck = rowIndex;
    let colToCheck = colIndex - 1;                                                    // -1 means the line goes from the right to the left. Therefore it cannot be less than 0
    while (colToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        colToCheck--;
      } else {
        break;
      }
    }
    colToCheck = colIndex + 1;                                                       // +1 means the line goes from the left to the right. Therefore it cannot be more than 6
    while (colToCheck <= 6) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        colToCheck++;
      } else {
        break;
      }
    }
    let isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;


    // Check vertically
    winningCells = [cell];
    rowToCheck = rowIndex - 1;                                                       // -1 means from the top to the button. It cannot be less than 0
    colToCheck = colIndex;
    while (rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex + 1;                                                      // +1 means from the button to the top. It cannot be more than 5
    while (rowToCheck <= 5 ) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;



    // Check diagonally /
    winningCells = [cell];
    rowToCheck = rowIndex + 1;                                        // rowIndex +1 and colIndex -1 means from the top right to the button left. col bigger than 0 and row less than 5               
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
        colToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex - 1;                                        // rowIndex -1 and colIndex +1 means from the button left to the top right. col less than 6 and row big than 0   
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck >= 0 ) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
        colToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;




    // Check diagonally \
    winningCells = [cell];
    rowToCheck = rowIndex - 1;                               // opposite of each other.            row -1 and col -1. From button right to the top left                                                                 
    colToCheck = colIndex - 1;                               // opposite of each other                
    while (colToCheck >= 0 && rowToCheck >= 0) {             // opposite of each other                             
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;                                        // opposite of each other
        colToCheck--;                                        // opposite of each other
      } else {
        break;
      }
    }
    rowToCheck = rowIndex + 1;                               // opposite of each other.           row +1 and col +1. From the top left to the button right.      
    colToCheck = colIndex + 1;                               // opposite of each other
    while (colToCheck <= 6 && rowToCheck <= 5 ) {            // opposite of each other                      
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;                                        // opposite of each other     
        colToCheck++;                                        // opposite of each other      
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;


    // Game is tie
    const rowsWithoutTop = rows.slice(0, 6)
    for (const row of rowsWithoutTop){
        for (const cell of row){
            const classList = getClassListArray(cell)
            if (!classList.includes('yellow') && !classList.includes('red')){       // tie
                return
            }
        }
    }
    gameIsLive = false
    statusSpan.textContent =  'Good game from both sides, the game is tie ! '
    statusSpan.style.color = 'yellow'
    statusSpan.style.border = '2px solid red'
    statusSpan.style.backgroundColor = 'black' 
    statusSpan.style.padding = '10px 15px'
    statusSpan.style.borderRadius = '10px'
    statusSpan.style.transition = '0.5s'
  };











// EVENT HANDLERS
const handleCellMouseOver = (e) => {                                                      // e shows all properties of the object 
    if (!gameIsLive) return
    const cell = e.target
    const [rowIndex, colIndex] = getCellLocation(cell)
    const topCell = topCells[colIndex]                                             
    topCell.classList.add(yellowIsNext ? 'yellow' : 'red');                             
    // if (yellowIsNext){
    //   topCell.classList.add('yellow')
    // } else {
    //   topCell.classList.add('red')
    // }
  }



const handleCellMouseOut = (e) => {
    const cell = e.target
    const [rowIndex, colIndex] = getCellLocation(cell)
    clearColorFromTop(colIndex)                                                         // function that while removing the mouse it deletes already existed class of yellow or red
}

const handleCellClick = (e) => {
    if (!gameIsLive) return
    const cell = e.target
    const [rowIndex, colIndex] = getCellLocation(cell);
    const openCell = getFirstOpenCellForColumn(colIndex);

    if (!openCell) return                                                          // if column is filled don't add anything don't do anything

    openCell.classList.add(yellowIsNext ? 'yellow' : 'red')                        // if there is nothing add yellow

    checkStatusOfGame(openCell)
    yellowIsNext = !yellowIsNext                                                   // after change yellow to red and red to yellow  
    clearColorFromTop(colIndex)                                                    // clear already existed class with name of yellow or red
    if (gameIsLive){                                                               // if game is alive then add circle in the top
        const topCell = topCells[colIndex]
        topCell.classList.add(yellowIsNext ? 'yellow' : 'red')                     // add yellow or red circle on the top of table
    }                       

}


const handlePopupReset = () =>{                                       
  for (const row of rows){
    for (const cell of row){
        cell.classList.remove('yellow')
        cell.classList.remove('red')
        cell.classList.remove('win')
    }
}
  gameIsLive = true
  yellowIsNext = true
  document.querySelector('.game-over').style.display = 'none'
  statusSpan.textContent = ''
}





// ADDING EVENT LISTENERS
for (const row of rows){                                            // selecting each row of the rows
    for (const cell of row) {                                       // selecting each cell of each row
        cell.addEventListener('mouseover', handleCellMouseOver);    // while putting mouse over the cell works handleCellMouseOver function (when you put mouse over the cell)
        cell.addEventListener('mouseout', handleCellMouseOut);      // while putting mouse over the cell works handleCellMouseOut function  (when you unput(remove) mouse over the cell)
        cell.addEventListener('click', handleCellClick);
}}                                 


resetButton.addEventListener('click', () => {
    for (const row of rows){
        for (const cell of row){
            cell.classList.remove('yellow')
            cell.classList.remove('red')
            cell.classList.remove('win')
        }
    }
    gameIsLive = true
    yellowIsNext = true
    statusSpan.textContent = ''
})

popupReset.addEventListener('click', handlePopupReset)                  










