import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { ApiserviceService } from '../apiservice.service';
import { Planete } from '../planete';

@Component({
  selector: 'app-planetes',
  imports: [],
  templateUrl: './planetes.component.html',
  styleUrl: './planetes.component.css'
})
export class PlanetesComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.

  //Le nécessaire à la réception et stockage des planètes.
  myapiservice = inject(ApiserviceService)  //Pour contacter l'API
  malisteplanetes = <any>[]                 //Contient les planètes de la page actuelle


  ngOnInit(){
    this.commServ.pushMessage("/planeteIcon.png")   //On envoie dans le channel quelle image afficher dans le header.

    this.myapiservice.getPlanetes()
  }

}
