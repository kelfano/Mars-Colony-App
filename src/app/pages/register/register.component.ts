import { Component, OnInit } from '@angular/core';
import {Job} from '../../models/job';
import {JobService} from '../../services/job.service';

import { Colonist } from '../../models/colonist';
import { ColonistService} from '../../services/colonist.service';

import {
  FormGroup, 
  FormControl, 
  FormBuilder, 
  Validators, 
  ValidatorFn,
  AbstractControl
} from '@angular/forms';


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


  constructor(private jobService: JobService, private colonistService: ColonistService) {

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
      age:new FormControl('',[Validators.required]),
      job_id: new FormControl('',[])
    });
  }



  postColonist() {
     const colonist = new Colonist('Mack', '35', '4');
     this.colonistService.postData(colonist)
                          .subscribe((newColonist) => {
                            console.log(newColonist);
                          });
    }


}


