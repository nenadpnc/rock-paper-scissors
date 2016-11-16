import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, HumanComponent, ComputerComponent, IScore } from '../shared/index';


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild(ComputerComponent) computer: ComputerComponent;

  computerChoice: string;
  conf: Object;
  items: string[];
  gameStarted: boolean = false;
  scores: IScore = {
      results: [], 
      player1: 0, 
      player2: 0, 
      tie: 0
    };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getGameConfiguration().subscribe((data: any) => {
      this.conf = data;
      this.items = Object.keys(data);
    });
    this.scores = this.api.getResults('humanVSComp') || this.scores;
  }

  startGame() {
    this.gameStarted = true;
    this.computer.shuffle();
  }

  onSelect(humanChoice: string) {
    this.gameStarted = false;
    this.computerChoice = this.computer.randomComputerResult();
    this.computer.clearShuffleInterval();
    this.api.evaluateResult(humanChoice, this.computerChoice, this.scores, this.conf, 'humanVSComp');
  }

  getAltConfig() {
    this.api.getAltGameConfiguration().subscribe((data: any) => {
      this.conf = data;
      this.items = Object.keys(data);
    })
  }


}
