import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Alien} from '../models/alien';

@Injectable()
export class AlienService {

    private Alien_URL ='https://red-wdp-api.herokuapp.com/api/mars/aliens';

  constructor(private http: Http) {}

   getData() {
    return this.http.get(this.Alien_URL)
             .map(this.extractAlien);
  }

  extractAlien(res: Response) {
    const aliens = res.json();
    return aliens;

  }
}
