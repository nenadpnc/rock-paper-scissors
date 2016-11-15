import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private _http: Http) {}

  getGameConfiguration(): Observable<any> {
    return this._http.get('/gameConfiguration.json').map((response: Response) => response.json());
  }

  getResults() {
    return JSON.parse(localStorage.getItem('results'));
  }

  setResult(results: any) {
    localStorage.setItem('results', JSON.stringify(results));
  }
}
