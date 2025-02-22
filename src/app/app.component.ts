import { Component, Input, Output } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, CommonModule,],
})
export class AppComponent {
  title = 'Vier_Gewinnt-2.0';
  aktuelleklasse = 'player';
  winner = 0;
  currentSpieler:number = 1;
  spalten: number[] = Array(7).fill(0); // 7 Spalten
  zeilen: number[] = Array(6).fill(0); // 6 Zeilen
  spielfeld: number[][] = Array(6).fill(null).map(() => Array(7).fill(0)); // 6x7-Array für das Spielfeld
  spielVorbei: boolean = false;

  Steinsetzen(column:number,row: number){
    let Tabelle = document.getElementById('tabelle');
    if(Tabelle != null){
      console.log(column,row);
      if(this.spielVorbei || this.spielfeld[row][column])//Wenn spielVorbei ist true oder spielfeld platz belegt ist
      {
        return; //gehe zurück der zug ist ungültig
      }

      let r = 5;//index der höchsten reihe in r deklarieren
      while(r>= 0 && this.spielfeld[r][column] !== 0)//solange r gößer als 0 UND spielfeld r column ungleich number:0
      {
        r--
      }

      if(r >= 0){
        this.spielfeld[r][column] = this.currentSpieler;
        Tabelle.children[r].children[column].classList.add(this.aktuelleklasse+this.currentSpieler);
        console.log(this.spielfeld);
        this.checkWinner();
        if(this.winner != 0){
          this.ResetGame(this.winner);
        }
        this.currentSpieler = 3 -this.currentSpieler;

      }
    }
  }
  ResetGame(StartPlayer: number){
    let Tabelle = document.getElementById("tabelle")
    this.aktuelleklasse = "td";
    this.winner = StartPlayer;
    this.spielfeld = Array(6).fill(null).map(() => Array(7).fill(0));

  }
    checkWinner(){
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (this.checkLine(this.spielfeld[r][c], this.spielfeld[r][c + 1], this.spielfeld[r][c + 2], this.spielfeld[r][c + 3])) {
            this.spielVorbei = true;
            this.winner = this.spielfeld[r][c];
            return;
          }
        }
      }

      // Überprüfe vertikal
      for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
          if (this.checkLine(this.spielfeld[r][c], this.spielfeld[r + 1][c], this.spielfeld[r + 2][c], this.spielfeld[r + 3][c])) {
            this.spielVorbei = true;
            this.winner = this.spielfeld[r][c];
            return;
          }
        }
      }

      // Überprüfe diagonal (links unten nach rechts oben)
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (this.checkLine(this.spielfeld[r][c], this.spielfeld[r - 1][c + 1], this.spielfeld[r - 2][c + 2], this.spielfeld[r - 3][c + 3])) {
            this.spielVorbei = true;
            this.winner = this.spielfeld[r][c];
            return;
          }
        }
      }

      // Überprüfe diagonal (links oben nach rechts unten)
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          if (this.checkLine(this.spielfeld[r][c], this.spielfeld[r + 1][c + 1], this.spielfeld[r + 2][c + 2], this.spielfeld[r + 3][c + 3])) {
            this.spielVorbei = true;
            this.winner = this.spielfeld[r][c];
            return;
          }
        }
      }
    }

    checkLine(a: number, b: number, c: number, d: number): boolean {
      return a !== 0 && a === b && a === c && a === d;
    }
  }

