import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { PersonnagesComponent } from './personnages/personnages.component';
import { PlanetesComponent } from './planetes/planetes.component';
import { VaisseauxComponent } from './vaisseaux/vaisseaux.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { FormulaireRechercheComponent } from './formulaire-recherche/formulaire-recherche.component';
import { FilmComponent } from './film/film.component';
import { EspeceComponent } from './espece/espece.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'/accueil'},
    {path:'accueil', component: AccueilComponent},
    {path:'personnages', component: PersonnagesComponent},
    {path:'planetes', component: PlanetesComponent},
    {path:'vaisseaux', component: VaisseauxComponent},
    {path:'vehicule', component: VehiculeComponent},
    {path:'a-propos', component: AProposComponent},
    {path:'formulaire-recherche', component: FormulaireRechercheComponent},
    {path:'film', component: FilmComponent},
    {path:'espece', component: EspeceComponent},
    {path:'details', component: DetailsComponent}
];
