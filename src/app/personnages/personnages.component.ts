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
  // Injection des services nécessaires
  commServ = inject(CommunicationService);    // Pour envoyer des messages vers le header (image)
  commDetails = inject(CommunicationService); // Pour envoyer les détails du personnage sélectionné
  
  myapiservice = inject(ApiserviceService);   // Service pour interagir avec l'API
  mylistePersonnage = <any>[];                 // Tableau pour stocker la liste des personnages reçus
  
  // Variables pour la pagination
  totalCount: number = 0;                      // Nombre total de personnages disponibles dans l'API
  totalPages: number = 0;                      // Nombre total de pages disponibles (20 pers/page)
  pagesArray: number[] = [];                   // Tableau des numéros de pages pour le sélecteur
  
  pageactuelle: number = 1;                     // Page actuellement affichée

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Envoie l'image dans le canal du header
    this.commServ.pushMessage("/personnageIcon.png");

    // Souscription pour recevoir les filtres du formulaire.
    this.commServ.onForm().subscribe((searchTerm:string) => {
      if (searchTerm && searchTerm.trim() !== '') {
        //Retrait des pages :
        this.totalCount = 0
        this.totalPages = 0
        this.pagesArray = []
        // Appel de l'API avec le filtre.
        this.myapiservice.getPersonnageFiltre(searchTerm).subscribe(
          (data: Personnage[]) => {
            this.mylistePersonnage = data;
          },
          error => console.error("Erreur lors de la recherche filtrée :", error)
        );
      } else {
        // Si le filtre est vide, rechargez la liste par défaut (page 1 par exemple).
        this.loadPersonnages(this.pageactuelle);
      }
    });

    // Appel à l'API pour récupérer la première page de personnages
    this.myapiservice.getPersonnagesPage(1).subscribe(data => {
      this.totalCount = data.count;  // Récupération du nombre total de personnages
      const totalApiPages = Math.ceil(this.totalCount / 10); // Calcul du nombre total de pages (10 pers/page)
      
      // Si le nombre de pages API est pair ou impair, ajuster le nombre de pages d'affichage
      if (totalApiPages % 2 === 0) {
        this.totalPages = totalApiPages / 2;
      } else {
        this.totalPages = Math.floor(totalApiPages / 2) + 1;
      }

      // Création d'un tableau des numéros de pages à afficher
      this.pagesArray = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    });

    // Chargement des personnages pour la première page
    this.loadPersonnages(this.pageactuelle);
  }

  // Méthode pour charger les personnages pour la page donnée
  loadPersonnages(page: number) {
    this.myapiservice.getPersonnagesByDisplayPage(page).subscribe(
      (data) => this.mylistePersonnage = data, // Remplissage de la liste de personnages
      error => console.error("Erreur lors du chargement des personnages :", error) // Gestion des erreurs
    );
  }

  // Méthode appelée lors du clic sur un numéro de page dans le sélecteur de pages
  clickPage(page: number) {
    this.pageactuelle = page;        // Mise à jour de la page actuellement affichée
    this.loadPersonnages(page);      // Chargement des personnages pour cette page
  }

  // Méthode appelée lors du clic sur un personnage pour afficher ses détails
  clickDetails(monperso: Personnage){
    console.log("Détail perso cliqué !\n" + monperso.birth_year);
    this.commDetails.pushDetails(monperso);  // Envoi des détails du personnage au canal
  }

  // Méthode appelée lorsque le composant est détruit
  ngOnDestroy(){
    this.commDetails.pushDetails(null);  // Envoi d'un message vide pour réinitialiser les détails
    console.log("Composant personnages détruit !");
  }
}
