import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'human-player',
  template: `
  <div class="player">
      <div class="header">
        human
      </div>
      <div class="board">
        <div class="buttons" *ngIf="gameStarted">
          <a *ngFor="let item of items" (click)="selectElement(item)">{{item}}</a>
        </div>
        <div class="choice">
          <h1>{{currentItem}}</h1>
        </div>
      </div>
    </div>
  `
})
export class HumanComponent {
  currentItem: string;
  @Input() gameStarted: boolean;
  @Input() items: string[];
  @Output() selectChoice: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  selectElement(item: string) {
      this.currentItem = item;
      this.selectChoice.emit(item);
  }

}
