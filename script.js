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
    const playerOneInput =
      document.querySelector("#player-one-name").value;
    const playerTwoInput =
      document.querySelector("#player-two-name").value;
    currentPlayer = playerOne = Player(playerOneInput || "Player 1", "x");
    playerTwo = Player(playerTwoInput || "Player 2", "o");

    Gameboard.resetBoard();

    // playTurn();
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const switchPlayer = () =>
    (currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne);

  const playTurn = (index) => {
    if (Gameboard.getBoard()[index] === "") {
      Gameboard.placeMarker(index, currentPlayer.marker);
      console.log(Gameboard.getBoard());
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

  return { startGame, playTurn, getCurrentPlayer };
})();

const DisplayController = (() => {
  const boardDiv = document.querySelector(".gameboard-container");
  const startButton = document.querySelector(".start-button");
  const infoMessage = document.querySelector(".info-message");

  startButton.addEventListener("click", () => {
    Game.startGame();
    infoMessage.textContent = `It's ${Game.getCurrentPlayer().name}'s turn!`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    const board = Gameboard.getBoard();

    const createGameboardCell = (cell, index) => {
      const cellDiv = document.createElement("div");

      cellDiv.classList.add("gameboard-cell");
      cellDiv.setAttribute("id", `$cell-${index}`);
      cellDiv.textContent = cell;

      cellDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();

        e.target.textContent = Game.getCurrentPlayer().marker;
        Game.playTurn(e.target.id.slice(-1));
      })

      return cellDiv;
    }

    board.forEach((cell, index) => {
      const cellDiv = createGameboardCell(cell, index);
      boardDiv.appendChild(cellDiv);
    });

  });
})();
