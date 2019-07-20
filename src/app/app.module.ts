import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { AppcontentComponent } from './appcontent/appcontent.component';

import { GetdataswapiService } from './getdataswapi.service';
import { PersonajesComponent } from './personajes/personajes.component';
import { HomeComponent } from './home/home.component';
import { PersonajeComponent } from './personaje/personaje.component';
import { ResidentesComponent } from './residentes/residentes.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'personaje/:name', component: PersonajeComponent },
  { path: 'residentes', component: ResidentesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    AppcontentComponent,
    PersonajesComponent,
    HomeComponent,
    PersonajeComponent,
    ResidentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DataTablesModule
  ],
  providers: [GetdataswapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
