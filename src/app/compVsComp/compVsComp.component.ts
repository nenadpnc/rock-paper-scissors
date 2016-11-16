import { Component, OnInit, ViewChildren } from '@angular/core';
import { ApiService, HumanComponent, ComputerComponent, IScore } from '../shared/index';


@Component({
  selector: 'comp-vs-comp',
  templateUrl: './compVsComp.component.html'
})
export class CompVsCompComponent implements OnInit {
  @ViewChildren(ComputerComponent) computerPlayers: ComputerComponent[];

  computerChoice1: string;
  computerChoice2: string;
  conf: Object;
  items: string[];
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
    this.scores = this.api.getResults('compVsComp') || this.scores;
  }

  startGame() {
    this.computerPlayers.forEach((computer: ComputerComponent) => computer.shuffle());
    setTimeout(() => {
        this.finish();
    }, 3000);
  }

  finish() {
    this.computerPlayers.forEach((computer: ComputerComponent, i: number) => {
        this['computerChoice' + (++i)] = computer.randomComputerResult();
        computer.clearShuffleInterval();
    });
    this.api.evaluateResult(this.computerChoice1, this.computerChoice2, this.scores, this.conf, 'compVsComp');
  }


}
