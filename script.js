const Gameboard = (() => {
  const board = Array(9).fill("");
  const getBoard = () => board;
  const placeMarker = (index, marker) => (board[index] = marker);
  const resetBoard = () => board.fill("");

  return { getBoard, placeMarker, resetBoard };
})();

const Player = (name, marker) => {
  name, marker;
};

const game = () => {
  let playerOne, playerTwo, currentPlayer;
  let gameOver = false;

  const startGame = () => {
    playerOne = Player("Player 1", "x");
    playerTwo = Player("Player 2", "o");
    currentPlayer = playerOne;
    Gameboard.resetBoard();
    gameOver = false;
  };

  const playTurn = (index) => {
    if (gameOver) return;

    const board = Gameboard.getBoard();

    if (board[index] !== "") {
      Gameboard.placeMarker(index, currentPlayer.marker);
    }
  };
};