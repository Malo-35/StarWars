import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';
import { Personnage } from '../personnage';

@Component({
  selector: 'app-personnages',
  templateUrl: './personnages.component.html',
  styleUrls: ['./personnages.component.css']
})
export class PersonnagesComponent {
  commServ = inject(CommunicationService);    // Nécessaire à l'installation des communications entre cette app et le header.
  commDetails = inject(CommunicationService); // Installation de la communiquation des détails.
  
  // Le nécessaire à l'utilisation de l'API et des données reçues.
  myapiservice = inject(ApiserviceService);     // De quoi appeler les fonctions d'interaction avec l'API.
  mylistePersonnage = <any>[];                   // Stocker les valeurs reçues.

  // Pour la pagination
  totalCount: number = 0;                        // Stocke le nombre total d'éléments tel que fourni par l'API.
  totalPages: number = 0;                        // Nombre total de pages d'affichage (20 objets par page).
  pagesArray: number[] = [];                     // Tableau des numéros de pages pour le sélecteur.

  pageactuelle: number = 1;                      // Page actuellement affichée.

  ngOnInit(): void {
    this.commServ.pushMessage("/personnageIcon.png");    // On envoie dans le channel l'image du header.
    
    this.myapiservice.getPersonnagesPage(1).subscribe(data => {
      this.totalCount = data.count;                         // Nombre total d'enregistrements.
      
      const totalApiPages = Math.ceil(this.totalCount / 10); // Nombre de pages API (10 pers / page).
      
      if (totalApiPages % 2 === 0) {
        this.totalPages = totalApiPages / 2;                 // Nombre de pages d'affichage (20 pers / page)
      } else {
        this.totalPages = Math.floor(totalApiPages / 2) + 1; // Si pages API impaires, +1
      }
  
      // Création d'un tableau [1,2,...,totalPages]
      this.pagesArray = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    });
  
    // Charger la première page
    this.loadPersonnages(this.pageactuelle);
  }
  

  // Méthode pour charger les données fusionnées des personnages selon la page d'affichage
  loadPersonnages(page: number) {
    this.myapiservice.getPersonnagesByDisplayPage(page).subscribe(
      (data) => this.mylistePersonnage = data,
      error => console.error("Erreur lors du chargement des personnages :", error)
    );
  }

  // Méthode appelée lors du click sur un numéro de page dans le sélecteur
  clickPage(page: number) {
    //console.log("Testclick : " + page);
    this.pageactuelle = page;
    this.loadPersonnages(page);
  }

  clickDetails(monperso: Personnage){
    console.log("Détail perso cliqué !\n" + monperso.birth_year)
    this.commDetails.pushDetails(monperso)
  }

  ngOnDestroy(){
    this.commDetails.pushDetails(null)
    console.log("Composant personnages détruit !")
  }
}
