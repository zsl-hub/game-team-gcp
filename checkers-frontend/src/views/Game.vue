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
        <RouterLink to="/"><Button class="SurrenderButton" aria-label="Submit"> 🏳️</Button></RouterLink>
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
    border: 3px solid cyan;
  }

  .Piece.King {
    border: 3px solid gold;
  }
</style>


<script setup>
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { onMounted } from 'vue';

  onMounted(() => {
    const Board = document.getElementById("Board");

    let CurrentPlayer = 'red';
    let SelectedCell = null;
    let GameState = Array(8).fill().map(() => Array(8).fill(0)); //tablica 8x8

    InitializeBoard();

    function InitializeBoard() {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");

          if ((row + col) % 2 === 0) {
            cell.classList.add("LightSquare");
          }
          else {
            cell.classList.add("DarkSquare");

            if (row < 3) {
              cell.classList.add("Occupied");
              cell.dataset.color = 'black';
              cell.appendChild(CreatePiece('Black'));
              GameState[row][col] = 2; //zapisanie stanu planszy
            }
            else if (row > 4) {
              cell.classList.add("Occupied");
              cell.dataset.color = 'red';
              cell.appendChild(CreatePiece('Red'));
              GameState[row][col] = 1; //zapisanie stanu planszy
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
        if (IsMoveAllowed(SelectedCell, ClickedCell)) {
          MovePiece(SelectedCell, ClickedCell);
          CheckForPromotion(ClickedCell);
          SwitchPlayer();
        } else if (IsCaptureAllowed(SelectedCell, ClickedCell)) {
          CapturePiece(SelectedCell, ClickedCell);
          CheckForPromotion(ClickedCell);
          SwitchPlayer();
        }
        else if (ClickedCell.dataset.color === CurrentPlayer) {
          SelectPiece(ClickedCell);
        }
      }
      else if (ClickedCell.dataset.color === CurrentPlayer) {
        SelectPiece(ClickedCell);
      }
    }

    function UnSelectPiece() {
      if (SelectedCell) {
        SelectedCell.classList.remove("Selected");
        SelectedCell = null;
      }
    }

    function SelectPiece(cell) {
      UnSelectPiece();
      cell.classList.add("Selected");
      SelectedCell = cell;
    }

    function IsMoveAllowed(fromCell, toCell) {
      const direction = CurrentPlayer === 'red' ? -1 : 1;
      const fromRow = parseInt(fromCell.dataset.row);
      const toRow = parseInt(toCell.dataset.row);
      const fromCol = parseInt(fromCell.dataset.col);
      const toCol = parseInt(toCell.dataset.col);

      const isKing = fromCell.firstChild.classList.contains('King');

    return isKing 
      ? Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 1 && GameState[toRow][toCol] === 0
      : fromRow + direction === toRow && Math.abs(fromCol - toCol) === 1 && GameState[toRow][toCol] === 0;
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
      GameState[fromRow][fromCol] = 0; // aktualizacja stanu planszy

      const newPiece = CreatePiece(CurrentPlayer.charAt(0).toUpperCase() + CurrentPlayer.slice(1));
      if (isKing) newPiece.classList.add('King');
      toCell.appendChild(newPiece);
      toCell.classList.add('Occupied');
      toCell.dataset.color = CurrentPlayer;
      GameState[toRow][toCol] = isKing ? (CurrentPlayer === 'black' ? 4 : 3) : (CurrentPlayer === 'black' ? 2 : 1); // aktualizacja stanu planszy

      console.log(GameState)

      UnSelectPiece();
    }

    function SwitchPlayer() {
      CurrentPlayer = CurrentPlayer === 'red' ? 'black' : 'red';
    }

    function IsCaptureAllowed(fromCell, toCell) {
      const fromRow = parseInt(fromCell.dataset.row);
      const toRow = parseInt(toCell.dataset.row);
      const fromCol = parseInt(fromCell.dataset.col);
      const toCol = parseInt(toCell.dataset.col);

      if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2) {
        const capturedRow = (fromRow + toRow) / 2;
        const capturedCol = (fromCol + toCol) / 2;
        return GameState[capturedRow][capturedCol] !== CurrentPlayer && GameState[capturedRow][capturedCol] !== null && GameState[toRow][toCol] === 0;
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
      GameState[capturedRow][capturedCol] = 0; // aktualizacja stanu planszy

      MovePiece(fromCell, toCell);
    }

    function CheckForPromotion(cell) {
      const row = parseInt(cell.dataset.row);
      if ((CurrentPlayer === 'red' && row === 0) || (CurrentPlayer === 'black' && row === 7)) {
        cell.firstChild.classList.add('King');
        GameState[row][parseInt(cell.dataset.col)] = CurrentPlayer === 'black' ? 4 : 3; // aktualizacja stanu planszy
      }
    }
  });
</script>