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
  aktuelleklasse = 'unplayed';
  currentSpieler:number = 1;
  spalten: number[] = Array(7).fill(0); // 7 Spalten
  zeilen: number[] = Array(6).fill(0); // 6 Zeilen
  spielfeld: number[][] = Array(6).fill(null).map(() => Array(7).fill(0)); // 6x7-Array für das Spielfeld
  spielVorbei: boolean = false;

  Steinsetzen(column:number,row: number){
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
      this.aktuelleklasse = "player1"
      //this.checkWinner();
      this.currentSpieler = 3 -this.currentSpieler;
    }
  }
}
//
