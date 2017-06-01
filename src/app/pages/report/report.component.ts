import { Component, OnInit } from '@angular/core';
import { Alien} from '../../models/alien';
import { AlienService} from '../../services/alien.service';

import { Report } from '../../models/report';
import { ReportService} from '../../services/report.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AlienService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  report: Report;

  constructor(private alienService: AlienService, private reportService: ReportService) { }

  ngOnInit() {


    this.alienService
      .getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
    });

  }

    postReport() {
     const report = new Report('yoda', '2015-10-01', 'Web develpoer', '4');
     this.reportService.postData(report)
                          .subscribe((newReport) => {
                            console.log(newReport);
                          });
    }


}