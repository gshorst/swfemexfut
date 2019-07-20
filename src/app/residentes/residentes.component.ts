import { Component, OnInit } from '@angular/core';
import { GetdataswapiService } from './../getdataswapi.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { People, Planets, Person, Planet } from './../People';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.scss']
})

export class ResidentesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  people: People;
  planets: Planets;
  planetName: string;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  getPlanetNames() {
    for(let personDetail of this.people.results) {
      for(let planetDetail of this.planets.results) {
        if (personDetail.homeworld == planetDetail.url) {
          personDetail.homeworld = planetDetail.name;
        }
      }
    }
  }
  constructor(private route: ActivatedRoute, private getDataSWApiService: GetdataswapiService) { 
  }

  async ngOnInit() {
    this.dtOptions = {
      ordering: false,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.planets = await this.getDataSWApiService.getAllPlanets();
    this.people = await this.getDataSWApiService.getAllPeople();
    this.getPlanetNames();
    this.people.results.sort((a,b) => { if(a.homeworld > b.homeworld) { return 1; } else if (a.homeworld < b.homeworld) { return -1; } else { return 0; } });
    await this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
