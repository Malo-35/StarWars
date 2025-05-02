import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';
import { Vehicule } from '../vehicule';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent {
  // Injection des services nécessaires
  commServ = inject(CommunicationService);    // Pour envoyer un message vers le header (image)
  commDetails = inject(CommunicationService); // Pour envoyer les détails du véhicule sélectionné
  
  myapiservice = inject(ApiserviceService);  // Service pour interagir avec l'API
  mylisteVehicule = <any>[];                  // Tableau pour stocker la liste des véhicules reçus

  // Variables pour la pagination
  totalCount: number = 0;                     // Nombre total de véhicules disponibles dans l'API
  totalPages: number = 0;                     // Nombre total de pages disponibles (20 véhicules/page)
  pagesArray: number[] = [];                  // Tableau des numéros de pages pour le sélecteur

  pageactuelle: number = 1;                    // Page actuellement affichée

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.commServ.pushMessage("/vehiculeIcon.png");   // Envoie l'icône dans le header

    // Souscription pour recevoir les filtres du formulaire.
        this.commServ.onForm().subscribe((searchTerm:string) => {
          if (searchTerm && searchTerm.trim() !== '') {
            //Retrait des pages :
            this.totalCount = 0
            this.totalPages = 0
            this.pagesArray = []
            // Appel de l'API avec le filtre.
            this.myapiservice.getVehiculeFiltre(searchTerm).subscribe(
              (data: Vehicule[]) => {
                this.mylisteVehicule = data;
              },
              error => console.error("Erreur lors de la recherche filtrée :", error)
            );
          } else {
            // Si le filtre est vide, rechargez la liste par défaut (page 1 par exemple).
            this.loadVehicules(this.pageactuelle);
          }
        });

    // Appel à l'API pour récupérer la première page de véhicules
    this.myapiservice.getVehiculesPage(1).subscribe(data => {
      this.totalCount = data.count;  // Récupération du nombre total de véhicules
      const totalApiPages = Math.ceil(this.totalCount / 10); // Calcul du nombre total de pages (10 véhicules/page)

      if (totalApiPages % 2 === 0) {
        this.totalPages = totalApiPages / 2;
      } else {
        this.totalPages = Math.floor(totalApiPages / 2) + 1;
      }

      // Création du tableau des numéros de pages à afficher
      this.pagesArray = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    });

    // Chargement des véhicules pour la première page
    this.loadVehicules(this.pageactuelle);
  }

  // Méthode pour charger les véhicules pour une page donnée
  loadVehicules(page: number) {
    this.myapiservice.getVehiculesByDisplayPage(page).subscribe(
      (data) => this.mylisteVehicule = data,  // Remplissage de la liste des véhicules
      error => console.error("Erreur lors du chargement des véhicules :", error) // Gestion des erreurs
    );
  }

  // Méthode appelée lors du clic sur un numéro de page
  clickPage(page: number) {
    this.pageactuelle = page;        // Mise à jour de la page actuelle
    this.loadVehicules(page);        // Chargement des véhicules pour cette page
  }

  // Méthode appelée lors du clic sur un véhicule pour afficher ses détails
  clickDetails(monVehicule: Vehicule){
    console.log("Détail véhicule cliqué !\n" + monVehicule.model);
    this.commDetails.pushDetails(monVehicule); // Envoi des détails du véhicule au canal
  }

  // Méthode appelée lorsque le composant est détruit
  ngOnDestroy(){
    this.commDetails.pushDetails(null);  // Envoi d'un message vide pour réinitialiser les détails
    console.log("Composant véhicules détruit !");
  }
}
