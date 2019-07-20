import { Component, OnInit } from '@angular/core';
import { GetdataswapiService } from './../getdataswapi.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { People } from './../People';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})

export class PersonajesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ordenar: string;
  people: People;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();


  convertToNumber(toConvert: string) {
    let resultado: number = 0;
    toConvert = toConvert.replace(',', ''); // This is because some numbers are coming as 1,358 for the value 1358
    if (toConvert == "unknown") { // If the value received is "unknown" will be returned with a very high value for order at the end
      resultado = 999999;
    } else {
      resultado = Number(toConvert);
    }
    return resultado;
  }
  
  constructor(private route: ActivatedRoute, private getDataSWApiService: GetdataswapiService) { 
  }

  async ngOnInit() {
    this.dtOptions = {
      ordering: false,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.route.queryParams.subscribe(params => {
      this.ordenar = params['ordenar'];
    });
    this.people = await this.getDataSWApiService.getAllPeople();
    switch(this.ordenar) {
      case "nombre": {
        await this.people.results.sort((a,b) => { if(a.name > b.name) { return 1; } else if (a.name < b.name) { return -1; } else { return 0; } });
        break;
      }
      case "peso": {
        await this.people.results.sort((a,b) => { if(this.convertToNumber(a.mass) > this.convertToNumber(b.mass)) { return 1; } else if (this.convertToNumber(a.mass) < this.convertToNumber(b.mass)) { return -1; } else { return 0; } } );
        break;
      }
      case "altura": {
        await this.people.results.sort((a,b) => { if(this.convertToNumber(a.height) > this.convertToNumber(b.height)) { return 1; } else if (this.convertToNumber(a.height) < this.convertToNumber(b.height)) { return -1; } else { return 0; } } );
        break;
      }
      default: {
        // If the order crtiteria is not nombre/peso/altura or is not specified, then I order by default by name.
        // This can be done sorting anyway by name and then only ask if the criteria are peso or altura
        // I made this in this way in order to be more explicit or easy to understand for all people. GSH
        await this.people.results.sort((a,b) => { if(a.name > b.name) { return 1; } else if (a.name < b.name) { return -1; } else { return 0; } });
        break;
      }
    }
    //console.log(this.people);
    //this.resultantTable = '<table datatable [dtOptions]="dtOptions" class="row-border hover"><thead><tr><th>Name</th><th>Height</th><th>Mass</th></tr></thead><tbody>';
    //for (let person of this.people.results) {
    //  this.resultantTable += '<tr ng-bind-html="tr"><td ng-bind-html="td">' + person.name + '</td><td ng-bind-html="td">' + person.height + '</td><td ng-bind-html="td">' + person.mass + '</td></tr>';
    //}
    //this.resultantTable += '</tbody></table>';
    //this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.resultantTable);
    await this.dtTrigger.next();
    //console.log(this.people);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
