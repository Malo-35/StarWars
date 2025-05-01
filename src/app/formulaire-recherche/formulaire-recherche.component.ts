import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommunicationService } from '../communication.service';
import { PersonnagesComponent } from "../personnages/personnages.component";
import { EspeceComponent } from "../espece/espece.component";
import { FilmComponent } from "../film/film.component";
import { VaisseauxComponent } from "../vaisseaux/vaisseaux.component";
import { VehiculeComponent } from "../vehicule/vehicule.component";
import { PlanetesComponent } from "../planetes/planetes.component";
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-formulaire-recherche',
  imports: [ReactiveFormsModule, PersonnagesComponent, EspeceComponent, FilmComponent, VaisseauxComponent, VehiculeComponent, PlanetesComponent],
  templateUrl: './formulaire-recherche.component.html',
  styleUrl: './formulaire-recherche.component.css'
})
export class FormulaireRechercheComponent implements OnInit {
  commServ = inject(CommunicationService); // Pour communiquer avec le header.

  @Output() onFilter = new EventEmitter<string>();
  
  formGroup: FormGroup;
  searchCtrl: FormControl;

  constructor() {
    // On ajoute ici un validateur qui vérifie qu'au moins 3 caractères sont présents.
    this.searchCtrl = new FormControl('', { validators: [], nonNullable: true });
    this.formGroup = new FormGroup({
      searchCtrl: this.searchCtrl
    });
  }

  ngOnInit(){
    setTimeout(() => {
      this.commServ.pushMessage("/rechercherqqchose.png");  //On envoie dans le channel quelle image afficher dans le header une seconde après l'initialisation afin d'avoir la bonne image puisque tous les autres composant vont blablater avant.
    }, 1000);

    // On écoute les changements de valeur avec un debounce de 2 secondes.
    this.searchCtrl.valueChanges.pipe(
      debounceTime(2000),           // Attend 2 secondes après le dernier changement.
      distinctUntilChanged(),        // Ne passe à la suite que si la valeur a réellement changé.
      tap((val: any) => console.log("Envoi de l'information :", val))
    ).subscribe(val => {
      this.commServ.pushForm(val);
    });
    
  }
}