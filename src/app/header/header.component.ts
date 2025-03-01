import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  gameMode: number = 0;
  gameModestr: string = ""; 
  @Output() gameModeChange = new EventEmitter<number>();
  onGameModeChange(gameMode: number) {
    this.gameModeChange.emit(gameMode);
    this.gameMode = gameMode;
    if(gameMode == 1){
      this.gameModestr = "Spieler gegen computer";
    }else{
      this.gameModestr = "Spieler gegen Spieler";
    }
  }
}
