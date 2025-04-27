import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';
import { Film } from '../film';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {
  // Injection des services nécessaires
  commServ = inject(CommunicationService);    // Pour envoyer un message vers le header (image)
  commDetails = inject(CommunicationService); // Pour envoyer les détails du film sélectionné
  
  myapiservice = inject(ApiserviceService);  // Service pour interagir avec l'API
  mylisteFilm = <any>[];                      // Tableau pour stocker la liste des films reçus

  // Variables pour la pagination
  totalCount: number = 0;                     // Nombre total de films disponibles dans l'API
  totalPages: number = 0;                     // Nombre total de pages disponibles (20 films/page)
  pagesArray: number[] = [];                  // Tableau des numéros de pages pour le sélecteur

  pageactuelle: number = 1;                    // Page actuellement affichée

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.commServ.pushMessage("/filmIcon.png");   // Envoie l'icône dans le header

    // Appel à l'API pour récupérer la première page de films
    this.myapiservice.getFilmsPage(1).subscribe(data => {
      this.totalCount = data.count;  // Récupération du nombre total de films
      const totalApiPages = Math.ceil(this.totalCount / 10); // Calcul du nombre total de pages (10 films/page)

      if (totalApiPages % 2 === 0) {
        this.totalPages = totalApiPages / 2;
      } else {
        this.totalPages = Math.floor(totalApiPages / 2) + 1;
      }

      // Création du tableau des numéros de pages à afficher
      this.pagesArray = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    });

    // Chargement des films pour la première page
    this.loadFilms(this.pageactuelle);
  }

  // Méthode pour charger les films pour une page donnée
  loadFilms(page: number) {
    this.myapiservice.getFilmsByDisplayPage(page).subscribe(
      (data) => this.mylisteFilm = data,  // Remplissage de la liste des films
      error => console.error("Erreur lors du chargement des films :", error) // Gestion des erreurs
    );
  }

  // Méthode appelée lors du clic sur un numéro de page
  clickPage(page: number) {
    this.pageactuelle = page;        // Mise à jour de la page actuelle
    this.loadFilms(page);            // Chargement des films pour cette page
  }

  // Méthode appelée lors du clic sur un film pour afficher ses détails
  clickDetails(monFilm: Film){
    console.log("Détail film cliqué !\n" + monFilm.title);
    this.commDetails.pushDetails(monFilm); // Envoi des détails du film au canal
  }

  // Méthode appelée lorsque le composant est détruit
  ngOnDestroy(){
    this.commDetails.pushDetails(null);  // Envoi d'un message vide pour réinitialiser les détails
    console.log("Composant films détruit !");
  }
}
