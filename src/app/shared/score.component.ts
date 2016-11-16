import { Component, Input } from '@angular/core';

@Component({
  selector: 'score',
  template: `
  <div class="score">
      <div class="result">
        <div>
          <p>Wins</p>
          <div>{{scores.player1}}</div>
        </div>
        <div class="tie">
          <p>Ties</p>
          <div>{{scores.tie}}</div>  
        </div>
        <div>
          <p>Wins</p>
          <div>{{scores.player2}}</div>  
        </div>
      </div>
      <div class="rounds">
        <p>Round {{scores.results.length + 1}}</p>
        <div class="round" *ngFor="let item of scores.results; let i = index">
          <div [class.winner]="item.score === 'player1'">{{item.player1}}</div>
          <div>Round {{i + 1}}</div>
          <div [class.winner]="item.score === 'player2'">{{item.player2}}</div>
        </div>
      </div>
    </div>
  `
})
export class ScoreComponent {
  @Input() scores: Object;

  constructor() {}

}

export interface IScore {
  results: any[], 
  player1: number, 
  tie: number, 
  player2: number
}
