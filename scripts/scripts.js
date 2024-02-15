// Function to Initialize the puzzle
function initPuzzle(){
  // get all the cells in the grid
  const cells = document.querySelectorAll("#game td div");

  // add a click event listener for each cell
  cells.forEach(cell => {
    cell.addEventListener("click", function(evt) {
      // Get the ID of the clicked cell
      const clickedID = cell.id;
  
      // Get the ID of the blank cell
      const blankCellId = document.querySelector("#game td div:empty").id;
     //document.getElementById("click-text").innerText = `Clicked cell ${clickedID} Blank cell ${blankCellId} Inner HTML ${cell.innerHTML}`;;

      // Check if the clicked cell is next to the blank cell
      if (isAdjacent(clickedID, blankCellId)) {
        swapValues(clickedID, blankCellId);
        if(isPuzzleSolved() || isPicturePuzzleSolved()){
          puzzleSolved();
        }
      }
    });
  });
}

// Global variable to track puzzle mode;
let isImageMode = false;

// Function for after puzzle is solved
function puzzleSolved(){
  document.getElementById("table").style.backgroundColor = "green";
  document.getElementById("solved").style.color = "black";
  const grid = document.querySelectorAll("#game td");
  grid.forEach(cell => {
    cell.style.backgroundColor = "green";
    cell.style.color = "green";
  });
}

// Function to check if the cells are adjacent
function isAdjacent(cell1Id, cell2Id) {
  // Parse the cell IDs to get their row and column numbers
  const cell1Row = parseInt(cell1Id.split(",")[0]);
  const cell1Col = parseInt(cell1Id.split(",")[1]);
  const cell2Row = parseInt(cell2Id.split(",")[0]);
  const cell2Col = parseInt(cell2Id.split(",")[1]);

  // Check if the cells are in the same row or column
  if (cell1Row === cell2Row && Math.abs(cell1Col - cell2Col) === 1) {
    // Cells are in the same row and adjacent horizontally
    return true;
  }
  if (cell1Col === cell2Col && Math.abs(cell1Row - cell2Row) === 1) {
    // Cells are in the same column and adjacent vertically
    return true;
  }

  // Cells are not adjacent
  return false;
}

// Function to swap the values of the two cells
function swapValues(cellId1, cellId2){
  // Get the content of the cells
  const content1 = document.getElementById(cellId1).innerHTML;
  const content2 = document.getElementById(cellId2).innerHTML;

  // Swap the content of the cells
  document.getElementById(cellId1).innerHTML = content2;
  document.getElementById(cellId2).innerHTML = content1;
}

// Function to scramble the puzzle
function scramblePuzzle(numSwap){

  // Perform the number of swaps on the puzzle
  for(let i = 0; i < numSwap; i++){
    // Get all the cells in grid
    const cells = document.querySelectorAll("#game td div");

    // get the blank cell
    const blankCell = document.querySelector("#game td div:empty");
    const blankId = blankCell.id;

    // set an array to store the adjacent options
    const adjacentCells = [];

    // get id's of the adjacent cells
    const blankCellRow = parseInt(blankId.split(",")[0]);
    const blankCellCol = parseInt(blankId.split(",")[1]);
   
    // check cells
    if(blankCellCol > 1){
      adjacentCells.push(blankCellRow + "," + (blankCellCol - 1));
    }
    if(blankCellCol < 4){
      adjacentCells.push(blankCellRow + "," + (blankCellCol + 1));
    }
    if(blankCellRow > 1){
      adjacentCells.push(blankCellRow - 1 + "," + blankCellCol);
    }
    if(blankCellRow < 4){
      adjacentCells.push(blankCellRow + 1 + "," + blankCellCol);
    }

    // randomly pick an adjacent cell
    const randomI = Math.floor(Math.random() * adjacentCells.length);
    const randomId = adjacentCells[randomI];

    // swap the cells
    swapValues(randomId, blankId);
  }
  document.getElementById("game").style.backgroundColor = "white";
}

// Function to reset the puzzle
function resetPuzzle(){
  // Get all the cells in grid
  const cells = document.querySelectorAll("#game td div");

  // Array to store the initial order
  const initialOrder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15",""];
  cells.forEach((cell, index) => {
    cell.innerHTML = initialOrder[index];
  });
  document.getElementById("table").style.backgroundColor = "white";
  document.getElementById("solved").style.color = "white";
  const grid = document.querySelectorAll("#game td");
  grid.forEach(cell => {
    cell.style.backgroundColor = "antiquewhite";
    cell.style.color = "black";
  });
}

function picturePuzzle(){
  const cells = document.querySelectorAll("#game td div");
  const initialOrder = ["image_part_001.jpg", "image_part_002.jpg", "image_part_003.jpg", "image_part_004.jpg", "image_part_005.jpg", "image_part_006.jpg", "image_part_007.jpg", "image_part_008.jpg", "image_part_009.jpg", "image_part_010.jpg", "image_part_011.jpg", "image_part_012.jpg", "image_part_013.jpg", "image_part_014.jpg", "image_part_015.jpg", ""];
  
  cells.forEach((cell, index) => {
    if (initialOrder[index] !== "") {
      const imageURL = initialOrder[index];
      cell.innerHTML = `<img src="${imageURL}" width="100" height="75">`;
      
    } else {
      cell.innerHTML = "";
    }
  });

  scramblePuzzle(100);
}

// Function to handle click event on the picture button
document.getElementById("picture-button").onclick = function(evt) {
	if (evt.target.id == "picture-button"){
    isImageMode = !isImageMode;
    if(isImageMode){
      resetPuzzle();
      picturePuzzle();
    } else{
      resetPuzzle();
    }
  }
};

// Function to check if the puzzle is solved
function isPuzzleSolved(){
  // Get all the cells in grid
  const cells = document.querySelectorAll("#game td div");

  // Loop through each cell and compare its content with its expected value
  for (let i = 0; i < cells.length - 1; i++) {
    // Convert cell content to integer for comparison
    const cellContent = parseInt(cells[i].innerHTML);
    
    // Expected value for the cell
    const expectedValue = i + 1;

    // If the content does not match the expected value, puzzle is not solved
    if (cellContent !== expectedValue) {
      return false;
    }
  }

  // If all cells are in their expected positions, puzzle is solved
  return true;
}

// Function to check if the picture puzzle is solved
function isPicturePuzzleSolved() {
  // Get all the cells in the grid
  const cells = document.querySelectorAll("#game td div");

  // Expected initial order of image sources
  const initialOrder = [
    "<img src=\"image_part_001.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_002.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_003.jpg\" width=\"100\" height=\"75\">",
    "<img src=\"image_part_004.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_005.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_006.jpg\" width=\"100\" height=\"75\">",
    "<img src=\"image_part_007.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_008.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_009.jpg\" width=\"100\" height=\"75\">",
    "<img src=\"image_part_010.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_011.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_012.jpg\" width=\"100\" height=\"75\">",
    "<img src=\"image_part_013.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_014.jpg\" width=\"100\" height=\"75\">", "<img src=\"image_part_015.jpg\" width=\"100\" height=\"75\">",""
  ];

  // Loop through each cell and compare its image source with the expected order
  for (let i = 0; i < cells.length; i++) {
    // Get the image source of the cell
    const imgSrc = cells[i].innerHTML;

    // Compare the image source with the expected order
    if (imgSrc !== initialOrder[i]) {
      // If any image source does not match, puzzle is not solved
      return false;
    }
  }

  // If all cells have the correct image sources, puzzle is solved
  return true;
}

// Function to handle click event on the reset button
document.getElementById("reset-button").onclick = function(evt) {
	if (evt.target.id == "reset-button"){
    resetPuzzle();
    }
  };

// Function to handle click event on the scramble button
document.getElementById("scramble-button").onclick = function(evt) {
  // Check if the clicked element is the scramble button
  if (evt.target.id == "scramble-button")
    resetPuzzle();
    scramblePuzzle(100);
};

window.onload = initPuzzle;
