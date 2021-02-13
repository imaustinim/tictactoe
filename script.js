// Initialize the Board
function initBoard (rows) {
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
        let row = [];
        for (let j = 0; j < rows[i].children.length; j++) {
            row.push(rows[i].children[j]);
        }
        arr.push(row);
    }
    return arr;
}
const rows = document.getElementsByClassName("row");
const boardArray = initBoard(rows);
let turn = true;
// Add Board Event Listener
board.addEventListener("click", (e) => {
    if (turn) {
        turn = false;
        e.target.innerHTML = "X";
    } else {
        turn = true;
        e.target.innerHTML = "O";
    }
    sqIndex = getIndex(e.target); 
    console.log(sqIndex);
    // Add O or X depending on t/f
    checkBoard(sqIndex, "row");
    checkBoard(sqIndex, "column");
    checkBoard(sqIndex, "diagonal");
    
})

// Board Functions
function getIndex(target) {
    for (let x = 0; x < boardArray.length; x++) {
        for (let y = 0; y < boardArray[x].length; y++) {
            if (boardArray[x][y] === target) {
                return [x,y];
            }
        }
    }
}

function checkBoard(arr, direction=String) {
    const x = arr[0];
    const y = arr[1];
    const eval = [];
    const b = boardArray.length;
    if (direction === "row") {
        for (let i = 0; i < b; i++) {
            eval.push(boardArray[x][i]);
        }
    } else if (direction === "column") {
        for (let i = 0; i < b; i++) {
            eval.push(boardArray[i][y]);
        }
    } else if (direction === "diagonal") {
        if (x == y) {
            for (let i = 0; i < b; i++) {
                eval.push(boardArray[i][i]);
            }
        } else if (b - 1 - x == y) {
            for (let i = 0; i < b; i++) {
                eval.push(boardArray[b - 1 - i][i]);
            }
        } else {
            return;
        }
    }
    let eval_string = [];
    eval.forEach(e => {
        eval_string.push(e.innerHTML);
    })
    let s = eval_string.join("");
    if (s == "XXX" || s == "OOO") {
        eval.forEach(e => {
            e.style.color= "red"; // Format CSS
        })  
    }
}

// Reset Button
const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", (e) => {
    console.log("reset"); // -> clear
})