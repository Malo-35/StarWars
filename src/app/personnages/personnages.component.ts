import { Component, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-personnages',
  imports: [],
  templateUrl: './personnages.component.html',
  styleUrl: './personnages.component.css'
})
export class PersonnagesComponent {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.
  
  //Le nécessaire à l'utilisation de l'api et des données reçues.
  myapiservice = inject(ApiserviceService)  //De quoi appeler les fonctions d'intéraction avec l'API
  mylisttest = <any>[]                      //Stocker les valeures reçues
  totaldepages:number = 1
  pageactuelle:number = 1
    

  ngOnInit(){
    this.commServ.pushMessage("/personnageIcon.png")    //On envoie dans le channel quelle image afficher dans le header.
    
    //Je récupère des data de personnages
    this.myapiservice.getPersonnages(1).subscribe(
      (data) => this.mylisttest = data
    )
  }

  testclick(page:number){
    console.log("Testclick : " + page)
    this.myapiservice.getPersonnages(page).subscribe(
      (data) => this.mylisttest = data
    )
  }
}
