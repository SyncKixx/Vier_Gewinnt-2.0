import { Injectable,ViewChild } from '@angular/core';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SpielKiService {
  enemyWinningScore: number = 0; // Bewertung für den Sieg des Spielers 1000 = winning chance/ 0 = Loosing
  comWinningScore: number = 0; //Bewertung für den Sieg des Computer / 1000 = winning chance/ 0 = Loosing
  indices: string[] = [];
  @ViewChild(AppComponent) appcomponent: AppComponent | undefined;
  
 
  //Bewerte das Spielfeld aus sicht des Spielers
  BewerteMax(spielfeldKi: number[][]): number{
  let Bewertung = 0;
    this.checkForWinningEnemyFormation(spielfeldKi);
    this.GetComStones(spielfeldKi);
    console.log(this.enemyWinningScore);
    return Bewertung;
  }

  //Gibt alle Steine des Computers zurück
  GetComStones(spielfeld: number[][]){
    for (let row = 0; row < spielfeld.length; row++) {
      for (let col = 0; col < spielfeld[row].length; col++) {
        if (spielfeld[row][col] === 2) {
          this.indices.push("" + row + "," + col);
          console.log("indices print: " + this.indices);
        }
      }
    }
  }

  checkForWinningEnemyFormation(spielfeldKi: number[][]):  number {

    // Horizontale Überprüfung
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if(spielfeldKi[r][c] == 1){
        if (this.checkLine(spielfeldKi[r][c],spielfeldKi[r][c + 1], spielfeldKi[r][c + 2])) {
          this.enemyWinningScore += 1000; //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r][c + 3]
          this.indices.push("" + r + "," + (c + 3));
        }
      }
    }
  }

    // Überprüfe vertikal
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 4; r++) {
        if(spielfeldKi[r][c] == 1){
        if (this.checkLine(spielfeldKi[r][c], spielfeldKi[r + 1][c], spielfeldKi[r + 2][c])) {
          this.enemyWinningScore += 1000;  //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r + 3][c]
          this.indices.push("" + (r+3) + "," + c);
        }
      }
    }
  }

    // Überprüfe diagonal (links unten nach rechts oben)
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if(spielfeldKi[r][c] == 1){
          if (this.checkLine(spielfeldKi[r][c],spielfeldKi[r - 1][c + 1], spielfeldKi[r - 2][c + 2])) {
            this.enemyWinningScore += 1000; //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r - 3][c + 3]
            this.indices.push("" + (r-3) + "," + (c+3));
          }
        }
      }
    }

    // Überprüfe diagonal (links oben nach rechts unten)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if(spielfeldKi[r][c] == 1){
          if (this.checkLine(spielfeldKi[r][c],spielfeldKi[r + 1][c + 1], spielfeldKi[r + 2][c + 2])) {
            this.enemyWinningScore += 1000; //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r + 3][c + 3]
            this.indices.push("" + (r+3) + "," + (c+3));
          }
        }
      }
    }
    return this.enemyWinningScore;
  }

  checkLine(a: number, b: number, c: number): boolean {
    return a !== 0 && a === b && a === c;
  }
}
