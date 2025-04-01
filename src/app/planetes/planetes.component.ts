import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-planetes',
  imports: [],
  templateUrl: './planetes.component.html',
  styleUrl: './planetes.component.css'
})
export class PlanetesComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.
  ngOnInit(){
    this.commServ.pushMessage("/planeteIcon.png")   //On envoie dans le channel quelle image afficher dans le header.
  }

}
