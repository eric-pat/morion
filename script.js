document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const board = Array.from({ length: 3 }, () => Array(3).fill(null));
  let currentPlayer = "X";
  let gameOver = false;

  const renderBoard = () => {
    app.innerHTML = "";
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", handleCellClick);

        app.appendChild(cellDiv);
      });
    });
  };

  const handleCellClick = (e) => {
    if (gameOver) return;

    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    if (board[row][col] === null) {
      board[row][col] = currentPlayer;
      renderBoard();
      checkWinner();

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  };

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== null &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        gameOver = true;
        alert(`Le joueur ${board[i][0]} a gagné !`);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== null &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        gameOver = true;
        alert(`Le joueur ${board[0][i]} a gagné !`);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] !== null &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      gameOver = true;
      alert(`Le joueur ${board[0][0]} a gagné !`);
      return;
    }

    if (
      board[0][2] !== null &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      gameOver = true;
      alert(`Le joueur ${board[0][2]} a gagné !`);
      return;
    }

    // Check for a tie
    if (!board.flat().includes(null)) {
      gameOver = true;
      alert("Match nul !");
    }
  };

  const resetButton = document.getElementById("resetButton");

  resetButton.addEventListener("click", () => {
    // Rafraîchir la page
    location.reload();
  });


  renderBoard();
});
