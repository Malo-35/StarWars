import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';
import { Vaisseaux } from '../vaisseaux';

@Component({
  selector: 'app-vaisseaux',
  templateUrl: './vaisseaux.component.html',
  styleUrls: ['./vaisseaux.component.css']
})
export class VaisseauxComponent {
  // Injection des services nécessaires
  commServ = inject(CommunicationService);    // Pour envoyer un message vers le header (image)
  commDetails = inject(CommunicationService); // Pour envoyer les détails du vaisseau sélectionné
  
  myapiservice = inject(ApiserviceService);  // Service pour interagir avec l'API
  mylisteVaisseaux = <any>[];                 // Tableau pour stocker la liste des vaisseaux reçus

  // Variables pour la pagination
  totalCount: number = 0;                     // Nombre total de vaisseaux disponibles dans l'API
  totalPages: number = 0;                     // Nombre total de pages disponibles (20 vaisseaux/page)
  pagesArray: number[] = [];                  // Tableau des numéros de pages pour le sélecteur

  pageactuelle: number = 1;                    // Page actuellement affichée

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.commServ.pushMessage("/vaisseauIcon.png");   // Envoie l'icône dans le header

    // Appel à l'API pour récupérer la première page de vaisseaux
    this.myapiservice.getVaisseauxPage(1).subscribe(data => {
      this.totalCount = data.count;  // Récupération du nombre total de vaisseaux
      const totalApiPages = Math.ceil(this.totalCount / 10); // Calcul du nombre total de pages (10 vaisseaux/page)

      if (totalApiPages % 2 === 0) {
        this.totalPages = totalApiPages / 2;
      } else {
        this.totalPages = Math.floor(totalApiPages / 2) + 1;
      }

      // Création du tableau des numéros de pages à afficher
      this.pagesArray = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    });

    // Chargement des vaisseaux pour la première page
    this.loadVaisseaux(this.pageactuelle);
  }

  // Méthode pour charger les vaisseaux pour une page donnée
  loadVaisseaux(page: number) {
    this.myapiservice.getVaisseauxByDisplayPage(page).subscribe(
      (data) => this.mylisteVaisseaux = data,  // Remplissage de la liste des vaisseaux
      error => console.error("Erreur lors du chargement des vaisseaux :", error) // Gestion des erreurs
    );
  }

  // Méthode appelée lors du clic sur un numéro de page
  clickPage(page: number) {
    this.pageactuelle = page;        // Mise à jour de la page actuelle
    this.loadVaisseaux(page);        // Chargement des vaisseaux pour cette page
  }

  // Méthode appelée lors du clic sur un vaisseau pour afficher ses détails
  clickDetails(monVaisseau: Vaisseaux){
    console.log("Détail vaisseau cliqué !\n" + monVaisseau.name);
    this.commDetails.pushDetails(monVaisseau); // Envoi des détails du vaisseau au canal
  }

  // Méthode appelée lorsque le composant est détruit
  ngOnDestroy(){
    this.commDetails.pushDetails(null);  // Envoi d'un message vide pour réinitialiser les détails
    console.log("Composant vaisseaux détruit !");
  }
}
