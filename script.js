const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const placeMarker = (index, marker) => board[index] = marker;
  const resetBoard = () => board.fill("");

  return { getBoard, placeMarker, resetBoard };
})();

const player = (name, marker) => { name, marker };

const game = () => {
  let playerOne, playerTwo, currentPlayer;
  let gameOver = false;

  const startGame = (nameOne, nameTwo) => {
    gameboard.resetBoard();
    playerOne = player(nameOne, "x");
    playerTwo = player(nameTwo, "o");
    currentPlayer = playerOne;
  };
}