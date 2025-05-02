import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.
  
  ngOnInit(): void {
    this.commServ.pushMessage("/accueilIcon.png")   //On envoie dans le channel quelle image afficher dans le header.
  }
}
