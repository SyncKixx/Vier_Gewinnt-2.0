import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, CommonModule,],
})
export class AppComponent {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;

  title = 'Vier_Gewinnt-2.0';
  aktuelleklasse = 'player';
  gamemode: number = 0;
  winner = 0;
  currentSpieler:number = 1;
  spalten: number[] = Array(7).fill(0); // 7 Spalten
  zeilen: number[] = Array(6).fill(0); // 6 Zeilen
  public spielfeld: number[][] = Array(6).fill(null).map(() => Array(7).fill(0)); // 6x7-Array für das Spielfeld
  spielVorbei: boolean = false;

  ngAfterViewInit(): void {
    if (this.headerComponent){
      this.headerComponent.gameModeChange.subscribe((gameMode: number) => {
        this.gamemode = gameMode;//this.gamemode 0
        if(gameMode == 0){
          this.ResetGame();
        }
      });
    }
    else {
      console.error("HeaderComponent nicht gefunden!");
    }
   // console.log(this.spielfeld);
    return;
  }


  Steinsetzen(column:number,row: number){

    let Tabelle = document.getElementById('tabelle');// Tabelle mit id finden um html zu bearbeiten
    if(Tabelle != null && Tabelle != undefined){
      if(this.spielVorbei || this.spielfeld[row][column])//Wenn spielVorbei ist true oder spielfeld platz belegt ist
      {
        return; //gehe zurück und tue nix. der zug ist ungültig wird aber nicht beendet
      }

      let r = 5;//index der höchsten reihe in r deklarieren
      while(r>= 0 && this.spielfeld[r][column] !== 0)//solange r gößer als 0 UND spielfeld r column ungleich number:0
      {
        r--
      }


      //spielstein setzen equal to drop piece
      if(r >= 0 && this.currentSpieler == 1 || r>= 0 && this.currentSpieler == 2 && this.gamemode == 2){
        this.spielfeld[r][column] = this.currentSpieler;
        Tabelle.children[r].children[column].classList.add(this.aktuelleklasse+this.currentSpieler);
        if(this.checkWin(this.currentSpieler)){
          this.winner = this.currentSpieler;
          this.spielVorbei = true;
        }

        if(this.gamemode == 1){
          this.currentSpieler = 3 -this.currentSpieler;
        }
      }
    }
    if(this.currentSpieler == 2 && !this.spielVorbei && this.gamemode == 1){
      console.log("KI ist am Zug"+this.currentSpieler);
      let bestMove = this.findBestMove()
      let r = this.getLowestEmptyRow(bestMove);
      Tabelle?.children[r].children[bestMove].classList.add(this.aktuelleklasse+this.currentSpieler);
      this.spielfeld[this.getLowestEmptyRow(bestMove)][bestMove] = this.currentSpieler;
      if(this.checkWin(this.currentSpieler)){
        this.winner = this.currentSpieler;
        this.spielVorbei = true;
      }
    }
    this.currentSpieler = 3 -this.currentSpieler;
    console.log(this.spielfeld);

  }

  checkWin(player: number): boolean {
  // Horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (this.spielfeld[row][col] == player &&
          this.spielfeld[row][col + 1] == player &&
          this.spielfeld[row][col + 2] == player &&
          this.spielfeld[row][col + 3] == player) {
            console.log(row + " " + col);
            console.log(this.spielfeld[row][col], this.spielfeld[row][col + 1], this.spielfeld[row][col + 2], this.spielfeld[row][col + 3]);
            console.log("horizontal");
        return true;
      }
    }
  }

  // Vertikal
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (this.spielfeld[row][col] === player &&
          this.spielfeld[row + 1][col] === player &&
          this.spielfeld[row + 2][col] === player &&
          this.spielfeld[row + 3][col] === player) {
            console.log("vertikal");
        return true;
      }
    }
  }

  // Diagonal (/)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (this.spielfeld[row + 3][col] === player &&
          this.spielfeld[row + 2][col + 1] === player &&
          this.spielfeld[row + 1][col + 2] === player &&
          this.spielfeld[row][col + 3] === player) {
            console.log("diagonal nach oben");
        return true;
      }
    }
  }

  // Diagonal (\)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (this.spielfeld[row][col] === player &&
          this.spielfeld[row + 1][col + 1] === player &&
          this.spielfeld[row + 2][col + 2] === player &&
          this.spielfeld[row + 3][col + 3] === player) {
            console.log("diagonal nach unten");
        return true;
      }
    }
  }

  return false;
}



  ResetGame(){

    let Tabelle = document.getElementById("tabelle");
    Tabelle?.querySelectorAll("td").forEach((td) => {
      td.classList.remove("player1");
      td.classList.remove("player2");
      td.classList.add("td");
    }
    );


    this.spielfeld = Array(6).fill(null).map(() => Array(7).fill(0));
    this.spielVorbei = false;
    this.winner = 0;
    this.currentSpieler = 1;

  }


    checkLine(a: number, b: number, c: number, d: number): boolean {
      return a !== 0 && a === b && a === c && a === d;
    }

    //-----------------------------------KI ABTEILUNG--------------------------------------------------------
    findBestMove(): number {
      let bestScore = -Infinity;
      let bestMove = -1;
      let board = this.spielfeld;

      if(board != undefined){
      for (let col = 0; col < 7; col++) {
        if (board[0][col] === 0) { // Wenn Spalte nicht voll ist
          const row = this.getLowestEmptyRow(col);
          board[row][col] = 2;

          const score = this.minimax(board, 4, false);

          board[row][col] = 0;

          if (score > bestScore) {
            bestScore = score;
            bestMove = col;
          }
        }
      }
      }
      return bestMove;
    }

    minimax(board: number[][], depth: number, isMaximizing: boolean): number {
      if (depth === 0) return this.evaluateBoard(board);
      if (this.checkWin(2)) return 1000;
      if (this.checkWin(1)) return -1000;

      if (isMaximizing) {
        let maxScore = -Infinity;
        for (let col = 0; col < 7; col++) {
          if (board[0][col] === 0) {
            const row = this.getLowestEmptyRow(col);
            board[row][col] = 2;
            maxScore = Math.max(maxScore, this.minimax(board, depth - 1, false));
            board[row][col] = 0;
          }
        }
        return maxScore;
      } else {
        let minScore = Infinity;
        for (let col = 0; col < 7; col++) {
          if (board[0][col] === 0) {
            const row = this.getLowestEmptyRow(col);
            board[row][col] = 1;
            minScore = Math.min(minScore, this.minimax(board, depth - 1, true));
            board[row][col] = 0;
          }
        }
        return minScore;
      }
    }

    evaluateBoard(board: number[][]): number {
      let score = 0;

      // Bewerte horizontale Sequenzen
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
          score += this.evaluateSequence(
            board[row][col],
            board[row][col + 1],
            board[row][col + 2],
            board[row][col + 3]
          );
        }
      }

      // Bewerte vertikale Sequenzen
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
          score += this.evaluateSequence(
            board[row][col],
            board[row + 1][col],
            board[row + 2][col],
            board[row + 3][col]
          );
        }
      }

      return score;
    }

    evaluateSequence(a: number, b: number, c: number, d: number): number {
      let aiCount = 0;
      let playerCount = 0;

      [a, b, c, d].forEach(cell => {
        if (cell === 2) aiCount++;
        else if (cell === 1) playerCount++;
      });

      if (playerCount === 0) {
        if (aiCount === 4) return 100;
        if (aiCount === 3) return 5;
        if (aiCount === 2) return 2;
        if (aiCount === 1) return 1;
      }
      if (aiCount === 0) {
        if (playerCount === 4) return -100;
        if (playerCount === 3) return -5;
        if (playerCount === 2) return -2;
        if (playerCount === 1) return -1;
      }
      return 0;
    }

    getLowestEmptyRow(col: number): number {
      let board = this.spielfeld;
        if(board != undefined){
        for (let row = 5; row >= 0; row--) {
          if (board[row][col] === 0) return row;
        }
      }
      return -1;

  }
  }

