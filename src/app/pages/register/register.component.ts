import { Component, OnInit } from '@angular/core';
import {Job} from '../../models/job';
import {JobService} from '../../services/job.service';

import { Colonist } from '../../models/colonist';
import { ColonistService} from '../../services/colonist.service';

import { Router } from '@angular/router';


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

const age = (tooYoung: number, tooOld: number): ValidatorFn => {
  if (tooYoung < 0 || tooOld < 0) {
    throw new Error ('You\ cannot be negative');
  }
  return (control: AbstractControl) => {
    return control.value < tooYoung || control.value > tooOld ? {'You\'re not the right age to go...':age}: null;
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobService, ColonistService],
})

export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonist: Colonist;
  registerForm: FormGroup;
  NO_JOB_SELECTED = '(none)';


  constructor(
    private jobService: JobService,
    private colonistService: ColonistService,
    private formBuilder: FormBuilder,
    private router: Router
     ) {
   }

  ngOnInit() {

    this.jobService
      .getData()
      .subscribe((data) => {
        this.jobs = data.jobs;
    });
 
    this.registerForm = new FormGroup({
      name: new FormControl('',[
        Validators.required, 
        Validators.maxLength(100), 
        Validators.minLength(3)
      ]),
      age:new FormControl('',[Validators.required, age(16,35)]),
      job_id: new FormControl(this.NO_JOB_SELECTED,[cantbe(this.NO_JOB_SELECTED)])
    });
  }


  register(e){
    e.preventDefault();
    if (this.registerForm.invalid){
      // the form is invalid
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value; 
      this.colonist = new Colonist (name,age,job_id);
      this.postColonist();
    }
  }



  postColonist() {
     this.colonistService.postData(this.colonist)
                          .subscribe((newColonist) => {
                                 window.localStorage.setItem("userID" ,newColonist.colonist.id);
                                 this.router.navigate(['/encounter']);
                          });
    }


}


