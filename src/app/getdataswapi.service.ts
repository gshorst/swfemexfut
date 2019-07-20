import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { People, Person, Planets } from './People';

@Injectable({
  providedIn: 'root'
})

export class GetdataswapiService {
  people: People;
  planets: Planets;

  constructor(private httpClient: HttpClient) {
    //console.log("Service is working");
  }

  async getAllPeople(): Promise<People> {
    this.people = await this.httpClient.get<People>('https://swapi.co/api/people/?page=1&format=json').toPromise();
    for (let pagina = 2; pagina <= 5; pagina++) {
      const responseDetailPerson = await this.httpClient.get<People>('https://swapi.co/api/people/?page=' + pagina.toString() + '&format=json').toPromise();
      for(let personDetail of responseDetailPerson.results) {
        this.people.results.push(personDetail);
      }
    }
    return this.people;
  }

  async getPeopleByName(cadenaABuscar: string): Promise<People> {
    this.people = await this.httpClient.get<People>('https://swapi.co/api/people/?format=json&search=' + cadenaABuscar).toPromise();
    return this.people
  }

  async getAllPlanets(): Promise<Planets> {
    this.planets = await this.httpClient.get<Planets>('https://swapi.co/api/planets/?format=json').toPromise();
    for (let pagina = 2; pagina <= 7; pagina++) {
      const responseDetailPlanet = await this.httpClient.get<Planets>('https://swapi.co/api/planets/?page=' + pagina.toString() + '&format=json').toPromise();
      for(let planetDetail of responseDetailPlanet.results) {
        this.planets.results.push(planetDetail);
      }
    }
    return this.planets;
  }
}
