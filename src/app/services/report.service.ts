import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { Report } from '../models/report';

@Injectable()
export class ReportService {

  private REPORT_URL = 'https://red-wdp-api.herokuapp.com/api/mars/report';

  // dependency injection
  constructor(private http: Http) { }

  postData(report: Report ){
    const headers = new Headers({'Content-Type':'application/json'});
    const options = new RequestOptions({ headers });
    return this.http.post(this.REPORT_URL, report, options)
                    .map(this.extractData);
  }

  extractData(res: Response){
    const report =res.json();
    return report;
  }

}

