import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-vaisseaux',
  imports: [],
  templateUrl: './vaisseaux.component.html',
  styleUrl: './vaisseaux.component.css'
})
export class VaisseauxComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.
  ngOnInit(){
    this.commServ.pushMessage("/vaisseauIcon.png")    //On envoie dans le channel quelle image afficher dans le header.
  }

}
