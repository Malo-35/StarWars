import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-film',
  imports: [],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.

  listeVehicule = <any>[]                      //Stocker les valeures reçues
  totaldepages:number = 1
  pageactuelle:number = 1
  
  ngOnInit(): void {
    this.commServ.pushMessage("/film.png")   //On envoie dans le channel quelle image afficher dans le header.
  }
}
