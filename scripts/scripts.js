// Function to Initialize the puzzle
function initPuzzle(){
  // get all the cells in the grid
  const cells = document.querySelectorAll("#game td div");

  // add a click event listener for each cell
  cells.forEach(cell => {
    cell.addEventListener("click", function(evt) {
      // Get the ID of the clicked cell
      const clickedID = evt.target.id;

      // Get the ID of the blank cell
      const blankCellId = document.querySelector("#game td div:empty").id;

      // Check if the clicked cell is next to the blank cell
      if(isAdjacent(clickedID, blankCellId)){
        // Swap the values of the two cells
        swapValues(clickedID, blankCellId);

        // Check if puzzle is solved
        if(isPuzzleSolved()){
          // Turn grid to Green
          document.getElementById("game").style.backgroundColor = "green";
        }
      }
    });
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
  // Get the value of the first cell
  const value1 = document.getElementById(cellId1).innerText;
  // Remove the value from the first cell
  document.getElementById(cellId1).innerText = "";
  // Add the value to the second cell
  document.getElementById(cellId2).innerText = value1;
}

// Function to check if the puzzle is solved
function isPuzzleSolved(){

  return false;
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
  document.getElementById("game").style.backgroundColor = "white";
}


// Function to handle click event on the reset button
document.getElementById("reset-button").onclick = function(evt) {
	if (evt.target.id == "reset-button"){
		document.getElementById("test").innerHTML = "Reset button clicked";
    resetPuzzle();
    }
  };

  
// Function to handle click event on the scramble button
document.getElementById("scramble-button").onclick = function(evt) {
  // Check if the clicked element is the scramble button
  if (evt.target.id == "scramble-button")
    // If yes, set innerHTML of element with id "test" to "Scramble button clicked"
    document.getElementById("test").innerHTML = "Scramble button clicked";
};

window.onload = initPuzzle;