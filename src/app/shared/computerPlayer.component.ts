import { Component, Input } from '@angular/core';

@Component({
  selector: 'computer-player',
  template: `
    <div class="player">
        <div class="header">
        computer
        </div>
        <div class="board">
        <div class="choice">
            <h1>{{current}}</h1>
        </div>
    </div>
  `
})
export class ComputerComponent {
  shuffleInterval: any;
  @Input() items: string[];
  @Input() current: string;

  constructor() {}

  shuffle() {
    this.shuffleInterval = setInterval(() => {
      this.current = this.randomComputerResult();
    }, 500);
  }

  randomComputerResult(): string {
      return this.items[Math.floor(Math.random() * this.items.length)];
  }

  clearShuffleInterval() {
      clearInterval(this.shuffleInterval);
  }
}
