import {Component, OnInit } from '@angular/core';
import {Encounter} from '../../models/encounter';
import {EncounterService} from '../../services/encounter.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
  providers: [EncounterService]
})

export class EncounterComponent implements OnInit {

  encounters: Encounter[] = [];

  constructor(
    private encounterService: EncounterService,
    private router: Router
    ) {

   }

  ngOnInit() {

    this.encounterService
      .getData()
      .subscribe((data) => {
        this.encounters = data.encounters;
    });

  }

  clicked(e){
    e.preventDefault();
    this.postEncounter();
  }

    postEncounter() {
      this.router.navigate(['/report']);
    };

  
 }



