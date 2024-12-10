const Gameboard = (() => {
  const board = Array(9).fill("");
  const getBoard = () => board;
  const placeMarker = (index, marker) => (board[index] = marker);
  const resetBoard = () => board.fill("");

  return { getBoard, placeMarker, resetBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const Game = (() => {
  let playerOne, playerTwo, currentPlayer;

  const startGame = () => {
    currentPlayer = playerOne = Player("Player 1", "x");
    playerTwo = Player("Player 2", "o");

    Gameboard.resetBoard();

    playTurn();
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne);

  const playTurn = (index) => {
    index = prompt() - 1;

    if (Gameboard.getBoard()[index] === "") {
      Gameboard.placeMarker(index, currentPlayer.marker);
      console.log(Gameboard.getBoard());
    } else {
      console.log("This cell's already been claimed!");
      return;
    }

    const isWin = checkWin();
    const isTie = checkTie();
    if (isWin) {
      console.log(currentPlayer.name + " wins!");
      return;
    } else if (isTie) {
      console.log("It's a tie!");
      return;
    } else {
      switchPlayer();
      playTurn();
    }
  };

  const checkWin = () => {
    const board = Gameboard.getBoard();

    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const winTests = [];

    winCombos.forEach((combo) => {
      const [a, b, c] = combo;
      winTests.push(board[a] && board[b] === board[a] && board[c] === board[a]);
    });

    return winTests.includes(true);
  };

  const checkTie = () => {
    return !Gameboard.getBoard().includes("");
  };

  return { startGame, playTurn };
})();

const DisplayController = (() => {
  const boardDiv = document.querySelector(".gameboard-container");
  const startButton = document.querySelector(".start-button");

  startButton.addEventListener("click", () => {
    const board = Gameboard.getBoard();

    board.forEach((_cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("gameboard-cell");
      cellDiv.setAttribute("id", `cell-${index}`)
      boardDiv.appendChild(cellDiv);
    });
  });
})();