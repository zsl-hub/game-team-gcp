<template>
  <main>

    <div class="Chat" name="Chat">
      <input type="text" name="Content" id="content" maxlength="20">
      <input type="Submit" value="Send">
    </div>
    <div class="Board" id="Board"></div>
    <div class="Options">
      <div class="FirstPlayer">
        <label for="username">1 Player: </label>
        <InputText id="FirstUsername" v-model="value" />
      </div>
      <div class="Surrender">
        <Button class="SurrenderButton" aria-label="Submit" @click='surrender()'> 🏳️</Button>
      </div>
      <div class="SecondPlayer">
        <label for="username">2 Player: </label>
        <InputText id="SecondUsername" v-model="value" />
      </div>
    </div>

  </main>
</template>


<style>
main {
  background: rgb(3, 1, 27);
  display: grid;
  grid-template-columns: 25% 50% 25%;
  width: 100%;
  height: 100vh;
  padding: 0;
}

.ChatContainer {
  align-content: end;
  border: 2px solid black;
}

.SendButton {
  border: 1px solid blue;
  background-color: white;
  color: rgb(36, 161, 222);
  font-size: 150%;
}

.Options {
  padding-right: 50%;
  margin-top: 25rem;
}

.FirstPlayer {
  margin-bottom: 4rem;
  text-align: center;
}

.SecondPlayer {
  margin-top: 4rem;
  text-align: center;
}

.Surrender {
  text-align: center;
}

.SurrenderButton {
  background-color: #193102;
  font-size: 200%;
}

.Board {
  margin: auto;
  height: 50rem;
  max-width: 50rem;
  width: 50rem;
  display: grid;
  grid-template-columns: repeat(8, 6.2rem);
  grid-template-rows: repeat(8, 6.21rem);
  border: 3px solid #818cf8;
  background-color: white;
}

.RedPiece {
  width: 5rem;
  height: 5rem;
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.BlackPiece {
  width: 5rem;
  height: 5rem;
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Piece {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.DarkSquare {
  background-color: rgb(189, 189, 189);
  display: flex;
  justify-content: center;
  align-items: center;
}

.LightSquare {
  background-color: #08440d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Selected {
  border: 5px solid cyan;
}

.King {
  border: 5px solid gold;
}

.PossibleMove {
  border: 5px solid red;
}
</style>


<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { onMounted, reactive } from 'vue';
import io from 'socket.io-client';

onMounted(() => {
  const Board = document.getElementById("Board");

  let CurrentPlayer = 'red';
  let SelectedCell = null;
  let GameState = {
    'A': Array(8).fill(0),
    'B': Array(8).fill(0),
    'C': Array(8).fill(0),
    'D': Array(8).fill(0),
    'E': Array(8).fill(0),
    'F': Array(8).fill(0),
    'G': Array(8).fill(0),
    'H': Array(8).fill(0)
  };
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; let MultiCapture = false;

  InitializeBoard();

  function InitializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if ((row + col) % 2 === 0) {
          cell.classList.add("LightSquare");
        } else {
          cell.classList.add("DarkSquare");

          if (row < 3) {
            cell.classList.add("Occupied");
            cell.dataset.color = 'black';
            cell.appendChild(CreatePiece('Black'));
            GameState[letters[row]][col] = 2;
          } else if (row > 4) {
            cell.classList.add("Occupied");
            cell.dataset.color = 'red';
            cell.appendChild(CreatePiece('Red'));
            GameState[letters[row]][col] = 1;
          }
        }

        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", CellClicked);
        Board.appendChild(cell);
      }
    }
    console.log(GameState)
  }

  function CreatePiece(color) {
    const Piece = document.createElement("div");
    Piece.classList.add("Piece");
    Piece.classList.add(color + "Piece");
    return Piece;
  }

  function CellClicked() {
    const ClickedCell = this;

    if (SelectedCell) {
      HandleSelectedCell(ClickedCell);
    }
    else if (ClickedCell.dataset.color === CurrentPlayer) {
      SelectPiece(ClickedCell);
    }
  }

  function HandleSelectedCell(ClickedCell) {
    if (IsCaptureAllowed(SelectedCell, ClickedCell)) {
      CaptureAndCheckForPromotion(ClickedCell);
      return;
    }

    if (!MultiCapture && IsMoveAllowed(SelectedCell, ClickedCell)) {
      MovePieceAndCheckForPromotion(ClickedCell);
      return;
    }

    if (!MultiCapture && ClickedCell.dataset.color === CurrentPlayer) {
      SelectPiece(ClickedCell);
    }
  }

  function CaptureAndCheckForPromotion(ClickedCell) {
    CapturePiece(SelectedCell, ClickedCell);
    CheckForPromotion(ClickedCell);

    if (IsAnotherCapturePossible(ClickedCell)) {
      SelectPiece(ClickedCell);
      MultiCapture = true;
      HighlightPossibleMoves(ClickedCell);
    }
    else {
      MultiCapture = false;
      SwitchPlayer();
    }
  }

  function MovePieceAndCheckForPromotion(ClickedCell) {
    MovePiece(SelectedCell, ClickedCell);
    CheckForPromotion(ClickedCell);
    SwitchPlayer();
  }

  function UnSelectPiece() {
    if (SelectedCell) {
      SelectedCell.classList.remove("Selected");
      SelectedCell = null;
    }
    ClearHighlightedMoves();
  }

  function SelectPiece(cell) {
    UnSelectPiece();
    cell.classList.add("Selected");
    SelectedCell = cell;
    HighlightPossibleMoves(cell);
  }

  function IsMoveAllowed(fromCell, toCell) {
    const direction = CurrentPlayer === 'red' ? -1 : 1;
    const fromRow = parseInt(fromCell.dataset.row);
    const toRow = parseInt(toCell.dataset.row);
    const fromCol = parseInt(fromCell.dataset.col);
    const toCol = parseInt(toCell.dataset.col);

    const isKing = fromCell.firstChild.classList.contains('King');

    return isKing
      ? Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 1 && GameState[letters[toRow]][toCol] === 0
      : fromRow + direction === toRow && Math.abs(fromCol - toCol) === 1 && GameState[letters[toRow]][toCol] === 0;
  }

  function MovePiece(fromCell, toCell) {
    const fromRow = parseInt(fromCell.dataset.row);
    const fromCol = parseInt(fromCell.dataset.col);
    const toRow = parseInt(toCell.dataset.row);
    const toCol = parseInt(toCell.dataset.col);

    const isKing = fromCell.firstChild.classList.contains('King');

    fromCell.innerHTML = '';
    fromCell.classList.remove('Occupied');
    fromCell.dataset.color = '';
    GameState[letters[fromRow]][fromCol] = 0;

    const newPiece = CreatePiece(CurrentPlayer.charAt(0).toUpperCase() + CurrentPlayer.slice(1));

    if (isKing) newPiece.classList.add('King');
    toCell.appendChild(newPiece);
    toCell.classList.add('Occupied');
    toCell.dataset.color = CurrentPlayer;
    GameState[letters[toRow]][toCol] = isKing ? (CurrentPlayer === 'black' ? 4 : 3) : (CurrentPlayer === 'black' ? 2 : 1);

    const socket = io(import.meta.env.VITE_BACK_HOST);
    console.log("testing move");
    socket.emit('boardData', {
      msg: 'trying to send board',
      board: Board
    });

    UnSelectPiece();
    ClearHighlightedMoves();
  }

  function SwitchPlayer() {
    if (!MultiCapture) {
      CurrentPlayer = CurrentPlayer === 'red' ? 'black' : 'red';
    }
  }

  function IsCaptureAllowed(fromCell, toCell) {
    const fromRow = parseInt(fromCell.dataset.row);
    const toRow = parseInt(toCell.dataset.row);
    const fromCol = parseInt(fromCell.dataset.col);
    const toCol = parseInt(toCell.dataset.col);

    const direction = CurrentPlayer === 'red' ? -1 : 1;
    const isKing = fromCell.firstChild.classList.contains('King');

    if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2) {
      const capturedRow = (fromRow + toRow) / 2;
      const capturedCol = (fromCol + toCol) / 2;

      if (!isKing && direction !== (toRow - fromRow) / Math.abs(toRow - fromRow)) {
        return false;
      }

      return GameState[letters[capturedRow]][capturedCol] !== 0 && GameState[letters[capturedRow]][capturedCol] !== (CurrentPlayer === 'red' ? 1 : 2) && GameState[letters[toRow]][toCol] === 0;
    }
    return false;
  }

  function CapturePiece(fromCell, toCell) {
    const capturedRow = (parseInt(fromCell.dataset.row) + parseInt(toCell.dataset.row)) / 2;
    const capturedCol = (parseInt(fromCell.dataset.col) + parseInt(toCell.dataset.col)) / 2;
    const capturedCell = document.querySelector(`[data-row='${capturedRow}'][data-col='${capturedCol}']`);
    capturedCell.innerHTML = '';
    capturedCell.classList.remove('Occupied');
    capturedCell.dataset.color = '';
    GameState[letters[capturedRow]][capturedCol] = 0;

    MovePiece(fromCell, toCell);
  }

  function CheckForPromotion(cell) {
    const row = parseInt(cell.dataset.row);
    if ((CurrentPlayer === 'red' && row === 0) || (CurrentPlayer === 'black' && row === 7)) {
      cell.firstChild.classList.add('King');
      GameState[letters[row]][parseInt(cell.dataset.col)] = CurrentPlayer === 'black' ? 4 : 3;
    }
  }

  function IsAnotherCapturePossible(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    const directions = [
      [2, 2], [2, -2], [-2, 2], [-2, -2]
    ];

    const isKing = cell.firstChild.classList.contains('King');
    const playerPiece = GameState[letters[row]][col];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const midRow = (row + newRow) / 2;
        const midCol = (col + newCol) / 2;
        const targetCellColor = GameState[letters[midRow]][midCol];
        if (
          GameState[letters[newRow]][newCol] === 0 &&
          targetCellColor !== 0 &&
          targetCellColor !== (CurrentPlayer === 'red' ? 1 : 2) &&
          targetCellColor !== (CurrentPlayer === 'red' ? 3 : 4) &&
          (isKing || (CurrentPlayer === 'red' ? dx < 0 : dx > 0))
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function HighlightPossibleMoves(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (MultiCapture) {
      const captureDirections = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
      captureDirections.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const targetCell = document.querySelector(`[data-row='${newRow}'][data-col='${newCol}']`);
          if (targetCell && IsCaptureAllowed(cell, targetCell)) {
            targetCell.classList.add('PossibleMove');
          }
        }
      });
    }

    else {
      const directions = CurrentPlayer === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

      const isKing = cell.firstChild.classList.contains('King');
      if (isKing) {
        directions.push([1, -1], [1, 1], [-1, -1], [-1, 1]);
      }

      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const targetCell = document.querySelector(`[data-row='${newRow}'][data-col='${newCol}']`);
          if (targetCell && IsMoveAllowed(cell, targetCell)) {
            targetCell.classList.add('PossibleMove');
          }
        }
      });

      const captureDirections = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
      captureDirections.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const targetCell = document.querySelector(`[data-row='${newRow}'][data-col='${newCol}']`);
          if (targetCell && IsCaptureAllowed(cell, targetCell)) {
            targetCell.classList.add('PossibleMove');
          }
        }
      });
    }
  }

  function ClearHighlightedMoves() {
    const possibleMoves = document.querySelectorAll('.PossibleMove');
    possibleMoves.forEach(cell => {
      cell.classList.remove('PossibleMove');
    });
  }
});

</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {

    };
  },

  methods: {
    async surrender() {
      const roomId = this.$route.params.id;
      console.log('Room ID:', roomId);

      try {
        await axios.delete(import.meta.env.VITE_BACK_HOST + `/api/v1/Game/${roomId}`);
        setTimeout(() => {
          this.$router.push('/');
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    },


  },


};
</script>