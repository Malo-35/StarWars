import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { PersonnagesComponent } from './personnages/personnages.component';
import { PlanetesComponent } from './planetes/planetes.component';
import { VaisseauxComponent } from './vaisseaux/vaisseaux.component';
import { AProposComponent } from './a-propos/a-propos.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'/accueil'},
    {path:'accueil', component: AccueilComponent},
    {path:'personnages', component: PersonnagesComponent},
    {path:'planetes', component: PlanetesComponent},
    {path:'vaisseaux', component: VaisseauxComponent},
    {path:'a-propos', component: AProposComponent},
];
