import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-espece',
  imports: [],
  templateUrl: './espece.component.html',
  styleUrl: './espece.component.css'
})
export class EspeceComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.

  //Le nécessaire à l'utilisation de l'api et des données reçues.
  myapiservice = inject(ApiserviceService)  //De quoi appeler les fonctions d'intéraction avec l'API
  listeEspece = <any>[]                      //Stocker les valeures reçues
  totaldepages:number = 1
  pageactuelle:number = 1
  
  ngOnInit(): void {
    this.commServ.pushMessage("/chercherespece.png")   //On envoie dans le channel quelle image afficher dans le header.
    this.myapiservice.getEspeces(1).subscribe(
      (data) => this.listeEspece = data
    )
  }
}
