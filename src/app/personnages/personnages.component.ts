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
  
  myapiservice = inject(ApiserviceService)
  mylisttest = <any>[]
    

  ngOnInit(){
    this.commServ.pushMessage("/personnageIcon.png")    //On envoie dans le channel quelle image afficher dans le header.
    
    //Je récupère des data de personnages (l'API me limite à 10 personnages par appel)
    this.myapiservice.getPersonnages().subscribe(
      (data) => this.mylisttest = data
    )
  }
}
