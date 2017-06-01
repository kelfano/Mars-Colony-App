import {Component, OnInit } from '@angular/core';
import {Encounter} from '../../models/encounter';
import {EncounterService} from '../../services/encounter.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
  providers: [EncounterService]
})

export class EncounterComponent implements OnInit {

  encounters: Encounter[] = [];

  constructor(private encounterService: EncounterService) {

   }

  ngOnInit() {

    this.encounterService
      .getData()
      .subscribe((data) => {
        this.encounters = data.encounters;
    });

  }
 }



