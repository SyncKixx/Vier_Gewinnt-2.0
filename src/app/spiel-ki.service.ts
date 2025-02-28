import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SpielKiService {
  enemyWinningFormation: boolean = false;




  //Bewerte das Spielfeld aus sicht des Spielers
  BewerteMax(spielfeldKi: number[][]): number{
  let Bewertung = 0;
    this.checkForWinningEnemyFormation(spielfeldKi);
    console.log(this.enemyWinningFormation);
    return Bewertung;
  }

  checkForWinningEnemyFormation(spielfeldKi: number[][]): boolean {

    // Horizontale Überprüfung
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if(spielfeldKi[r][c] == 1){
        if (this.checkLine(spielfeldKi[r][c],spielfeldKi[r][c + 1], spielfeldKi[r][c + 2])) {
          console.log("Horizontale Prüfung");
          this.enemyWinningFormation = true;
          //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r][c + 3]
        }
      }
    }
  }

    // Überprüfe vertikal
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 4; r++) {
        if(spielfeldKi[r][c] == 1){
        if (this.checkLine(spielfeldKi[r][c], spielfeldKi[r + 1][c], spielfeldKi[r + 2][c])) {
          this.enemyWinningFormation = true;
          //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r + 3][c]
        }
      }
    }
  }

    // Überprüfe diagonal (links unten nach rechts oben)
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if(spielfeldKi[r][c] == 1){
          if (this.checkLine(spielfeldKi[r][c],spielfeldKi[r - 1][c + 1], spielfeldKi[r - 2][c + 2])) {
            this.enemyWinningFormation = true;
            //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r - 3][c + 3]
          }
        }
      }
    }

    // Überprüfe diagonal (links oben nach rechts unten)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if(spielfeldKi[r][c] == 1){
          if (this.checkLine(spielfeldKi[r][c],spielfeldKi[r + 1][c + 1], spielfeldKi[r + 2][c + 2])) {
            this.enemyWinningFormation = true;
            //Gebe wert von dem fehlenden Punkt zurück spielfeldKi[r + 3][c + 3]
          }
        }
      }
    }
    return this.enemyWinningFormation;
  }

  checkLine(a: number, b: number, c: number): boolean {
    return a !== 0 && a === b && a === c;
  }
}
