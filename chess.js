const board = document.querySelector(".chessboard");
const turnIndicator = document.getElementById("turnIndicator");
const content = document.querySelector(".content")
let selectedSquare = null;
let currentTurn = "white";

const boardstate = [
    ["r", "n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]
];

const pieceIcons = {
    r:"♜", n:"♞", b:"♝", q:"♛", k:"♚", p:"♟",
    R:"♖", N:"♘", B:"♗", Q:"♕", K:"♔", P:"♙"
};

// Initialize board
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square");
        if((row + col) % 2 == 0){
            square.classList.add("light");
        } else {
            square.classList.add("dark");
        }
        square.dataset.row = row;
        square.dataset.col = col;
        square.textContent = pieceIcons[boardstate[row][col]] || "";
        board.appendChild(square);
    }
}

const squares = document.querySelectorAll(".square");
squares.forEach(square => {
    square.addEventListener("click", () => {
        if(!selectedSquare){
            if(square.textContent.trim() !== ""){
                const row = Number(square.dataset.row);
                const col = Number(square.dataset.col);
                const piece = boardstate[row][col];
                const isWhitePiece = piece === piece.toUpperCase(); // FIX: Added const
                
                if((currentTurn === "white" && isWhitePiece) || (currentTurn === "black" && !isWhitePiece)) {
                    selectedSquare = square;
                    square.classList.add("selected");
                }
            }
        } else {
            attemptMove(selectedSquare, square);
            selectedSquare.classList.remove("selected"); // FIX: Remove from correct square
            selectedSquare = null;
        }
    });
});

function renderBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        const row = Number(square.dataset.row);
        const col = Number(square.dataset.col);
        const piece = boardstate[row][col];
        square.textContent = pieceIcons[piece] || "";
    });
}

function attemptMove(fromSquare, toSquare){
    const fromRow = Number(fromSquare.dataset.row);
    const fromCol = Number(fromSquare.dataset.col);
    const toRow = Number(toSquare.dataset.row);
    const toCol = Number(toSquare.dataset.col);
    const piece = boardstate[fromRow][fromCol];
    
    if(!isValidMove(piece, fromRow, fromCol, toRow, toCol)){
        return;
    }

    // simulate
    const captured = boardstate[toRow][toCol];
    boardstate[toRow][toCol] = piece;
    boardstate[fromRow][fromCol] = "";
    
    const isWhite = piece === piece.toUpperCase();
    const stillInCheck = isKingInCheck(isWhite);
    
    // revert
    boardstate[fromRow][fromCol] = piece;
    boardstate[toRow][toCol] = captured;
    
    if (stillInCheck) {
        alert("Illegal move! Your king would be in check.");
        return;
    }

    // Make the actual move
    boardstate[toRow][toCol] = piece;
    boardstate[fromRow][fromCol] = "";
    renderBoard();
    
    // Switch turns
    currentTurn = currentTurn === "white" ? "black" : "white";
    turnIndicator.textContent = (currentTurn === "white" ? "White" : "Black") + "'s Turn";
    content.style.flexDirection = (currentTurn === "white" ? "column-reverse": "column");
    
    // FIX: Check if opponent's king is in check
    setTimeout(() => {
        const opponentIsWhite = currentTurn === "white";
        if (isKingInCheck(opponentIsWhite)) {
            if (isCheckmate(opponentIsWhite)) {
                const winner = currentTurn === "white" ? "BLACK" : "WHITE";
                alert("CHECKMATE! " + winner + " WINS!");
                document.querySelector("#turnIndicator").textContent = winner + "'S WIN";
                document.querySelector("#turnIndicator").classList.add("winner")
            } else {
                alert("CHECK!");
            }
        }
    }, 100);
}

function isValidMove(piece, fromRow, fromCol, toRow, toCol){
    switch(piece.toLowerCase()){
        case "p": return isValidPawnMove(piece, fromRow, fromCol, toRow, toCol);
        case "r": return isValidRookMove(piece, fromRow, fromCol, toRow, toCol);
        case "n": return isValidKnightMove(piece, fromRow, fromCol, toRow, toCol);
        case "b": return isValidBishopMove(piece, fromRow, fromCol, toRow, toCol);
        case "q": return isValidQueenMove(piece, fromRow, fromCol, toRow, toCol);
        case "k": return isValidKingMove(piece, fromRow, fromCol, toRow, toCol);
        default: return false;
    }
}

function isValidPawnMove(piece, fromRow, fromCol, toRow, toCol) {
    const isWhite = piece === piece.toUpperCase();
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    const rowDiff = toRow - fromRow;
    const colDiff = Math.abs(toCol - fromCol);
    const target = boardstate[toRow][toCol];
    
    if (rowDiff !== direction && rowDiff !== 2 * direction) {
        return false;
    }
    
    if (colDiff === 0 && rowDiff === direction && target === "") {
        return true;
    }
    
    if (colDiff === 0 && rowDiff === 2 * direction && fromRow === startRow && 
        boardstate[fromRow + direction][fromCol] === "" && target === "") {
        return true;
    }
    
    if (colDiff === 1 && rowDiff === direction && target !== "") {
        const targetIsWhite = target === target.toUpperCase();
        return isWhite !== targetIsWhite;
    }
    
    return false;
}

function isPathClear(fromRow, fromCol, toRow, toCol){
    const rowStep = Math.sign(toRow - fromRow);
    const colStep = Math.sign(toCol - fromCol);
    let r = fromRow + rowStep;
    let c = fromCol + colStep;
    
    while(r !== toRow || c !== toCol){
        if(boardstate[r][c] !== ""){
            return false;
        }
        r += rowStep;
        c += colStep;
    }
    return true;
}

function isValidRookMove(piece, fromRow, fromCol, toRow, toCol) {
    if (fromRow !== toRow && fromCol !== toCol) {
        return false;
    }
    
    if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
        return false;
    }
    
    const target = boardstate[toRow][toCol];
    if (target === "") {
        return true;
    }
    
    const isWhite = piece === piece.toUpperCase();
    const targetIsWhite = target === target.toUpperCase();
    return isWhite !== targetIsWhite;
}

function isValidBishopMove(piece, fromRow, fromCol, toRow, toCol) {
    // FIX: Must move diagonally (abs(rowDiff) === abs(colDiff))
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    if (rowDiff !== colDiff || rowDiff === 0) {
        return false;
    }
    
    if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
        return false;
    }
    
    const target = boardstate[toRow][toCol];
    if (target === "") {
        return true;
    }
    
    const isWhite = piece === piece.toUpperCase();
    const targetIsWhite = target === target.toUpperCase();
    return isWhite !== targetIsWhite;
}

function isValidQueenMove(piece, fromRow, fromCol, toRow, toCol) {
    if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
        return false;
    }
    
    const target = boardstate[toRow][toCol];
    if (target === "") {
        return true;
    }
    
    const isWhite = piece === piece.toUpperCase();
    const targetIsWhite = target === target.toUpperCase();
    return isWhite !== targetIsWhite;
}

function isValidKingMove(piece, fromRow, fromCol, toRow, toCol) {
    // FIX: King can move 1 square in any direction
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    if (rowDiff > 1 || colDiff > 1) {
        return false;
    }
    
    if (rowDiff === 0 && colDiff === 0) {
        return false;
    }
    
    const target = boardstate[toRow][toCol];
    if (target === "") {
        return true;
    }
    
    const isWhite = piece === piece.toUpperCase();
    const targetIsWhite = target === target.toUpperCase();
    return isWhite !== targetIsWhite;
}

function isValidKnightMove(piece, fromRow, fromCol, toRow, toCol) {
    if(!((Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 2) ||
        (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 1))){
        return false;
    }
    
    const target = boardstate[toRow][toCol];
    if (target === "") {
        return true;
    }
    
    const isWhite = piece === piece.toUpperCase();
    const targetIsWhite = target === target.toUpperCase();
    return isWhite !== targetIsWhite;
}

function findKing(isWhite){
    const kingChar = isWhite ? "K" : "k";
    for (let r = 0; r < 8; r++){
        for (let c = 0; c < 8; c++){
            if (boardstate[r][c] === kingChar){
                return { row: r, col: c };
            }
        }
    }
}

function doesPawnAttack(piece, fromRow, fromCol, toRow, toCol) {
    const isWhite = piece === piece.toUpperCase();
    const direction = isWhite ? -1 : 1;
    return (
        toRow === fromRow + direction &&
        Math.abs(toCol - fromCol) === 1
    );
}

function isKingInCheck(isWhiteKing) {
    const kingPos = findKing(isWhiteKing);
    if (!kingPos) return false;
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = boardstate[r][c];
            if (piece === "") continue;
            
            const isWhitePiece = piece === piece.toUpperCase();
            if (isWhitePiece === isWhiteKing) continue;
            
            if (piece.toLowerCase() === "p") {
                if (doesPawnAttack(piece, r, c, kingPos.row, kingPos.col)) {
                    return true;
                }
            } else {
                if (isValidMove(piece, r, c, kingPos.row, kingPos.col)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isCheckmate(isWhiteKing) {
    if (!isKingInCheck(isWhiteKing)) return false;
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = boardstate[r][c];
            if (piece === "") continue;
            
            const isWhitePiece = piece === piece.toUpperCase();
            if (isWhitePiece !== isWhiteKing) continue;
            
            for (let tr = 0; tr < 8; tr++) {
                for (let tc = 0; tc < 8; tc++) {
                    if (!isValidMove(piece, r, c, tr, tc)) continue;
                    
                    const captured = boardstate[tr][tc];
                    boardstate[tr][tc] = piece;
                    boardstate[r][c] = "";
                    
                    const stillInCheck = isKingInCheck(isWhiteKing);
                    
                    boardstate[r][c] = piece;
                    boardstate[tr][tc] = captured;
                    
                    if (!stillInCheck) return false;
                }
            }
        }
    }
    return true;
}

