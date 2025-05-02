import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';
import { Espece } from '../espece';

@Component({
  selector: 'app-espece',
  templateUrl: './espece.component.html',
  styleUrls: ['./espece.component.css']
})
export class EspeceComponent {
  commServ = inject(CommunicationService);
  commDetails = inject(CommunicationService);
  myapiservice = inject(ApiserviceService);
  mylisteEspece = <any>[];

  totalCount: number = 0;
  totalPages: number = 0;
  pagesArray: number[] = [];
  pageactuelle: number = 1;

  ngOnInit(): void {
    this.commServ.pushMessage("/especeIcon.png");

    // Souscription pour recevoir les filtres du formulaire.
        this.commServ.onForm().subscribe((searchTerm:string) => {
          if (searchTerm && searchTerm.trim() !== '') {
            //Retrait des pages :
            this.totalCount = 0
            this.totalPages = 0
            this.pagesArray = []
            // Appel de l'API avec le filtre.
            this.myapiservice.getEspeceFiltre(searchTerm).subscribe(
              (data: Espece[]) => {
                this.mylisteEspece = data;
              },
              error => console.error("Erreur lors de la recherche filtrée :", error)
            );
          } else {
            // Si le filtre est vide, rechargez la liste par défaut (page 1 par exemple).
            this.loadEspeces(this.pageactuelle);
          }
        });

    this.myapiservice.getEspecesPage(1).subscribe(data => {
      this.totalCount = data.count;
      const totalApiPages = Math.ceil(this.totalCount / 10);
      this.totalPages = totalApiPages % 2 === 0 ? totalApiPages / 2 : Math.floor(totalApiPages / 2) + 1;
      this.pagesArray = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    });

    this.loadEspeces(this.pageactuelle);
  }

  loadEspeces(page: number) {
    this.myapiservice.getEspecesByDisplayPage(page).subscribe(
      (data) => this.mylisteEspece = data,
      error => console.error("Erreur lors du chargement des espèces :", error)
    );
  }

  clickPage(page: number) {
    this.pageactuelle = page;
    this.loadEspeces(page);
  }

  clickDetails(monEspece: Espece) {
    console.log("Détail espèce cliqué !\n" + monEspece.name)
    this.commDetails.pushDetails(monEspece)
  }

  ngOnDestroy(){
    this.commDetails.pushDetails(null)
    console.log("Composant espèces détruit !")
  }
}
