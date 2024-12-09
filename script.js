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
  let gameOver = false;

  const startGame = () => {
    playerOne = Player("Player 1", "x");
    playerTwo = Player("Player 2", "o");
    currentPlayer = playerOne;
    Gameboard.resetBoard();
    gameOver = false;
    playTurn();
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne);

  const playTurn = (index) => {
    index = prompt() - 1;
    if (gameOver) return;

    if (Gameboard.getBoard()[index] === "") {
      Gameboard.placeMarker(index, currentPlayer.marker);
      console.log(Gameboard.getBoard());
    } else {
      console.log("This cell's already been claimed!");
      return;
    }

    const result = checkWin();
    console.log(result);
    if (result) {
      console.log(currentPlayer.name + " wins!");
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
      if (board[a] && board[b] === board[a] && board[c] === board[a]) {
        winTests.push(true);
      } else {
        winTests.push(false);
      }
    });

    if (winTests.includes(true)) {
      return true;
    } else {
      return false;
    }
  };
  return { startGame };
})();
