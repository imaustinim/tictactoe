// 1) Initialize the Board
function initBoard(rows) {
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
        let row = [];
        for (let j = 0; j < rows[i].children.length; j++) {
            row.push(rows[i].children[j].children[0]);
        }
        arr.push(row);
    }
    console.log(arr);
    return arr;
}

const header = document.getElementById("header");
const rows = document.getElementsByClassName("row");
const boardArray = initBoard(rows);
let clickedBox = [];
let turn = true;

// 2) Add Board Event Listener
const boxes = document.querySelectorAll(".box");
boxes.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        let target = e.target;
        if (clickedBox.includes(target)) return;
        if (e.target.classList.contains("box")) target = e.target.children[0];
        clickedBox.push(target);
        clickedBox.push(target.parentElement);
        if (turn) {
            turn = false;
            target.innerHTML = "X";
            header.innerHTML = "Player O's Turn";
        } else {
            turn = true;
            target.innerHTML = "O";
            header.innerHTML = "Player X's Turn";
        }
        target.style.opacity = "1";
        // console.log(target);
        sqIndex = getIndex(target);
        // console.log(sqIndex);
        if (checkBoard(sqIndex, "row") || checkBoard(sqIndex, "column") || checkBoard(sqIndex, "diagonal")) {
            // console.log("nice win");
        }
    })
})

// 3) Board Functions
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
            e.style.color= "red";
        })
        return true;
    }
}

// 4) Add Reset Button Listener
const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", (e) => {
    console.log("reset");
    boxes.forEach(e => {
        e.children[0].style.opacity = "0";
        e.children[0].style.color = "white";
        e.children[0].innerHTML = "1";
    });
    clickedBox = [];
})
