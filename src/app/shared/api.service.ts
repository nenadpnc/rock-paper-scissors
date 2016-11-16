import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IScore } from './index';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  getGameConfiguration(): Observable<any> {
    return this.http.get('/gameConfiguration.1.json').map((response: Response) => response.json());
  }

  getAltGameConfiguration(): Observable<any> {
    return this.http.get('/gameConfiguration.json').map((response: Response) => response.json());
  }

  getResults(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  storeResult(results: any, key: string) {
    localStorage.setItem(key, JSON.stringify(results));
  }

  evaluateResult(player1Choice: string, player2Choice: string, scores: IScore, conf: Object, key: string) {
    if (player1Choice === player2Choice) {
      return this.setResults(player1Choice, player2Choice, 'tie', scores, key);
    }

    if (conf[player1Choice].beats.indexOf(player2Choice) !== -1) {
      return this.setResults(player1Choice, player2Choice, 'player1', scores, key);
    } else {
      return this.setResults(player1Choice, player2Choice, 'player2', scores, key)
    }
  }

  setResults(player1Choice: string, player2Choice: string, winner: string, scores: IScore, key: string) {
    let score = {
      player1: player1Choice,
      player2: player2Choice,
      score: winner
    };
    scores[winner]++;
    scores.results.push(score);
    this.storeResult(scores, key);
  }
}
