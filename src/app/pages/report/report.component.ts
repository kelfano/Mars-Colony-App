import { Component, OnInit } from '@angular/core';
import { Alien} from '../../models/alien';
import { AlienService} from '../../services/alien.service';

import { Report } from '../../models/report';
import { ReportService} from '../../services/report.service';

import { Router } from  '@angular/router';

import {
  FormGroup, 
  FormControl, 
  FormBuilder, 
  Validators, 
  ValidatorFn,
  AbstractControl
} from '@angular/forms';


const cantbe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? {'Cant\'be this value': value} : null;
  };
};


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AlienService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  report: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = "(none)"

  constructor(
    private alienService: AlienService, 
    private reportService: ReportService,
    private router: Router
    ) {

     }

  ngOnInit() {

    this.alienService
      .getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
    });


    this.reportForm = new FormGroup({
      atype : new FormControl(this.NO_ALIEN_SELECTED,[cantbe(this.NO_ALIEN_SELECTED)]),

      action : new FormControl('',[
        Validators.required,
        Validators.minLength(5),
      ])
    });

  }


  reported(e){
    e.preventDefault();
    if (this.reportForm.invalid){
      // the form is invalid
    } else {
      const alien_id = this.reportForm.get('atype').value;
      const action = this.reportForm.get('action').value;
      const date = new Date();
      const prettyDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      const id = window.localStorage.getItem("userID");
      this.report = new Report (alien_id,prettyDate,action,id);
      this.postReport();

    }
  }



    postReport() {
    //  const report = new Report('yoda', '2015-10-01', 'Web develpoer', '4');
     this.reportService.postData(this.report)
                          .subscribe((newReport) => {
                            console.log(newReport);
                            this.router.navigate(['/encounter']);
                          });
    }



}
