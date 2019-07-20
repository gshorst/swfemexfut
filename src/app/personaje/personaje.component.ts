import { Component, OnInit } from '@angular/core';
import { GetdataswapiService } from './../getdataswapi.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { People } from './../People';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  people: People;
  namePerson: string;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, private getDataSWApiService: GetdataswapiService) { }

  async ngOnInit() {
    this.dtOptions = {
      ordering: false,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.namePerson = this.route.snapshot.paramMap.get('name');
    this.people = await this.getDataSWApiService.getPeopleByName(this.namePerson);
    await this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
