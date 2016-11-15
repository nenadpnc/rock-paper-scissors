import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  conf: Object;
  currentItem2: string;
  currentItem1: string;
  shuffleInterval: any;
  gameStarted: boolean = false;
  scores: { results: any[], player1: number, tie: number, player2: number } = {
      results: [], 
      player1: 0, 
      player2: 0, 
      tie: 0
    };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getGameConfiguration().subscribe((data: any) => this.conf = data);
    this.scores = this.api.getResults() || this.scores;
  }

  startGame() {
    this.gameStarted = true;
    this.currentItem1 = '';
    this.shuffle();
  }

  shuffle() {
    this.shuffleInterval = setInterval(() => {
      this.currentItem2 = this.randomPlayer2Result();
    }, 500);
  }

  selectElement(item: string) {
    clearInterval(this.shuffleInterval);
    this.currentItem1 = item;
    this.currentItem2 = this.randomPlayer2Result();

    this.evaluateResult(this.currentItem1, this.currentItem2);
  }

  randomPlayer2Result(): string {
      let items = Object.keys(this.conf);
      return items[Math.floor(Math.random() * items.length)];
  }

  evaluateResult(player1Choice, player2Choice) {
    this.gameStarted = false;
    if (player1Choice === player2Choice) {
      this.setResults(player1Choice, player2Choice, 'tie');
    }

    if (this.conf[player1Choice].beats.indexOf(player2Choice) !== -1) {
      this.setResults(player1Choice, player2Choice, 'player1');
    } else {
      this.setResults(player1Choice, player2Choice, 'player2')
    }
  }

  setResults(player1Choice: string, player2Choice: string, winner: string) {
    let score = {
      player1: player1Choice,
      player2: player2Choice,
      score: winner
    };
    this.scores[winner]++;
    this.scores.results.push(score);
    this.api.setResult(this.scores);
  }

}
